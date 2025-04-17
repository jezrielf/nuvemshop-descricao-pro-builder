import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[MANAGE-PLANS] ${step}${detailsStr}`);
};

// Helper function to check if user has a specific role
const hasRole = (roleString: string | null, roleToCheck: string): boolean => {
  if (!roleString) return false;
  
  // Handle comma-separated roles
  if (roleString.includes(',')) {
    const roles = roleString.split(',').map(r => r.trim());
    return roles.includes(roleToCheck);
  }
  
  // Handle single role
  return roleString === roleToCheck;
};

// Function to compress feature data to fit in Stripe's metadata limits
const compressFeatures = (features: any[]): string => {
  // Create a minimal representation of features
  const minimalFeatures = features.map(feature => {
    // Only keep essential data and shorten property names
    return {
      n: feature.name.substring(0, 30), // Truncate name if needed
      i: feature.included ? 1 : 0       // Use 1/0 instead of true/false
    };
  });
  
  // Stringify and limit total length if needed
  let featuresStr = JSON.stringify(minimalFeatures);
  
  // If still too long, truncate the array
  if (featuresStr.length > 480) { // Leave some buffer
    // Keep reducing features until under limit
    let i = minimalFeatures.length;
    while (featuresStr.length > 480 && i > 0) {
      i--;
      featuresStr = JSON.stringify(minimalFeatures.slice(0, i));
    }
    // Add indicator that features were truncated
    featuresStr = featuresStr.substring(0, featuresStr.length - 1) + ',{"n":"...","i":0}]';
  }
  
  return featuresStr;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to bypass RLS
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY is not set");
      return new Response(JSON.stringify({ 
        error: "STRIPE_SECRET_KEY is not set", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    logStep("Stripe key verified");

    // Parse request body with method and action
    let method, action, productId, productData;
    try {
      const requestBody = await req.json();
      method = requestBody.method;
      action = requestBody.action;
      productId = requestBody.productId;
      productData = requestBody.productData;
      logStep("Request parsed", { method, action });
    } catch (parseError) {
      logStep(`ERROR: Failed to parse request - ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      return new Response(JSON.stringify({ 
        error: "Failed to parse request body", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // For the list-products action, we allow public access for displaying plans to users
    if (method === "GET" && action === "list-products") {
      try {
        // List all products with their prices
        const products = await stripe.products.list({
          active: true,
          expand: ['data.default_price'],
          limit: 100,
        });
        
        // Format the products into a more usable format
        const formattedProducts = products.data.map(product => {
          const defaultPrice = product.default_price as Stripe.Price;
          
          // Try to parse features from metadata
          let features = [];
          try {
            if (product.metadata.features) {
              const parsedFeatures = JSON.parse(product.metadata.features);
              
              // Check if we have compressed features (with n/i properties)
              if (parsedFeatures.length > 0 && 'n' in parsedFeatures[0]) {
                features = parsedFeatures.map((f: any) => ({
                  id: `feature-${features.length}`,
                  name: f.n,
                  included: f.i === 1
                }));
              } else {
                // Standard format
                features = parsedFeatures;
              }
            }
          } catch (e) {
            logStep(`Warning: Could not parse features for product ${product.id}`, e);
            features = [];
          }
          
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: defaultPrice ? (defaultPrice.unit_amount || 0) / 100 : 0,
            priceId: defaultPrice ? defaultPrice.id : null,
            isActive: product.active,
            metadata: product.metadata,
            features: features,
            isDefault: product.metadata.default === 'true',
          };
        });
        
        logStep("Products retrieved", { count: formattedProducts.length });
        return new Response(JSON.stringify({ products: formattedProducts, success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } catch (listError) {
        logStep(`ERROR: Failed to list products - ${listError instanceof Error ? listError.message : String(listError)}`);
        return new Response(JSON.stringify({ 
          error: `Failed to list products: ${listError instanceof Error ? listError.message : String(listError)}`, 
          success: false,
          products: [] 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200, // Return 200 even for errors to prevent app disruption
        });
      }
    }

    // For admin actions, we first check for Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header provided");
      return new Response(JSON.stringify({ 
        error: "No authorization header provided", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    logStep("Authorization header found");

    // Get the JWT token from the Authorization header
    const token = authHeader.replace("Bearer ", "");
    
    try {
      // Verify the JWT token and get user data
      const { data: { user }, error: jwtError } = await supabaseClient.auth.getUser(token);
      
      if (jwtError) {
        logStep(`ERROR: JWT verification failed - ${jwtError.message}`);
        return new Response(JSON.stringify({ 
          error: `Authentication error: ${jwtError.message}`, 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      if (!user) {
        logStep("ERROR: No user found in JWT");
        return new Response(JSON.stringify({ 
          error: "No user found in JWT token", 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      logStep("User authenticated", { userId: user.id, email: user.email });
      
      // Check if user is admin
      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (profileError) {
        logStep(`ERROR: Profile error - ${profileError.message}`);
        return new Response(JSON.stringify({ 
          error: `Profile error: ${profileError.message}`, 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      // Check if the user has the admin role (accounting for comma-separated roles)
      if (!hasRole(profile.role, 'admin')) {
        logStep("ERROR: User is not an admin", { role: profile.role });
        return new Response(JSON.stringify({ 
          error: "Unauthorized: Admin access required", 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      logStep("Admin permission verified", { userId: user.id });
      
      // Handle admin actions based on method and action
      if (method === "POST" && action === "create-product") {
        try {
          // Compress features data to fit in metadata
          const compressedFeatures = compressFeatures(productData.features || []);
          
          // Create a new product
          const product = await stripe.products.create({
            name: productData.name,
            description: productData.description || '',
            active: productData.isActive,
            metadata: {
              features: compressedFeatures,
              default: productData.isDefault ? 'true' : 'false',
            },
          });
          
          // Create a price for the product
          const priceObj = await stripe.prices.create({
            unit_amount: Math.round(productData.price * 100), // Convert to cents
            currency: 'brl',
            product: product.id,
            recurring: { interval: 'month' },
          });
          
          // Update the product with the default price
          await stripe.products.update(product.id, {
            default_price: priceObj.id,
          });
          
          logStep("Product created", { productId: product.id, priceId: priceObj.id });
          return new Response(JSON.stringify({ 
            success: true,
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              price: productData.price,
              priceId: priceObj.id,
              isActive: product.active,
              features: productData.features || [],
              isDefault: productData.isDefault,
            }
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        } catch (createError) {
          logStep(`ERROR: Failed to create product - ${createError instanceof Error ? createError.message : String(createError)}`);
          return new Response(JSON.stringify({ 
            error: `Failed to create product: ${createError instanceof Error ? createError.message : String(createError)}`, 
            success: false 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }
      
      if (method === "PUT" && action === "update-product") {
        try {
          // Compress features to fit in metadata limits
          const compressedFeatures = compressFeatures(productData.features || []);
          
          // Update the product
          const product = await stripe.products.update(productId, {
            name: productData.name,
            description: productData.description || '',
            active: productData.isActive,
            metadata: {
              features: compressedFeatures,
              default: productData.isDefault ? 'true' : 'false',
            },
          });
          
          // Update price if needed
          if (productData.priceId) {
            try {
              // We don't update existing prices in Stripe, instead create a new one if price changed
              const currentPrice = await stripe.prices.retrieve(productData.priceId);
              if (currentPrice.unit_amount !== Math.round(productData.price * 100)) {
                // Create a new price
                const newPrice = await stripe.prices.create({
                  unit_amount: Math.round(productData.price * 100),
                  currency: 'brl',
                  product: productId,
                  recurring: { interval: 'month' },
                });
                
                // Update the product with the new default price
                await stripe.products.update(productId, {
                  default_price: newPrice.id,
                });
                
                // Mark old price as inactive (optional)
                await stripe.prices.update(productData.priceId, { active: false });
              }
            } catch (priceError) {
              logStep(`WARNING: Price update failed - ${priceError instanceof Error ? priceError.message : String(priceError)}`);
              // Continue even if price update fails
            }
          }
          
          logStep("Product updated", { productId });
          return new Response(JSON.stringify({ 
            success: true,
            product: {
              id: product.id,
              name: product.name,
              description: product.description,
              price: productData.price,
              priceId: productData.priceId,
              isActive: product.active,
              features: productData.features || [],
              isDefault: productData.isDefault,
            }
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        } catch (updateError) {
          logStep(`ERROR: Failed to update product - ${updateError instanceof Error ? updateError.message : String(updateError)}`);
          return new Response(JSON.stringify({ 
            error: `Failed to update product: ${updateError instanceof Error ? updateError.message : String(updateError)}`, 
            success: false 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }
      
      if (method === "DELETE" && action === "delete-product") {
        try {
          // Check if product is set as default
          const product = await stripe.products.retrieve(productId);
          if (product.metadata.default === 'true') {
            logStep("ERROR: Cannot delete default product");
            return new Response(JSON.stringify({ 
              error: "Cannot delete default product. Set another product as default first.", 
              success: false 
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            });
          }
          
          // Archive the product instead of deleting (Stripe recommended approach)
          await stripe.products.update(productId, {
            active: false,
          });
          
          logStep("Product archived", { productId });
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        } catch (deleteError) {
          logStep(`ERROR: Failed to delete product - ${deleteError instanceof Error ? deleteError.message : String(deleteError)}`);
          return new Response(JSON.stringify({ 
            error: `Failed to delete product: ${deleteError instanceof Error ? deleteError.message : String(deleteError)}`, 
            success: false 
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
      }
      
      // If action is not handled
      logStep(`ERROR: Unknown action - ${action}`);
      return new Response(JSON.stringify({ 
        error: `Unknown action: ${action}`, 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
      
    } catch (authError) {
      logStep(`ERROR: Authentication error - ${authError instanceof Error ? authError.message : String(authError)}`);
      return new Response(JSON.stringify({ 
        error: `Authentication error: ${authError instanceof Error ? authError.message : String(authError)}`, 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in manage-plans", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
