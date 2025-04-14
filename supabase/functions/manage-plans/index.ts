
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

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep(`ERROR: Authentication error - ${userError.message}`);
      return new Response(JSON.stringify({ 
        error: `Authentication error: ${userError.message}`, 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    
    const user = userData.user;
    if (!user?.email) {
      logStep("ERROR: User not authenticated or email not available");
      return new Response(JSON.stringify({ 
        error: "User not authenticated or email not available", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    
    // Check if user is admin
    try {
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
          status: 200, // Return 200 even for errors to prevent app disruption
        });
      }
      
      if (profile.role !== 'admin') {
        logStep("ERROR: Unauthorized - user is not admin");
        return new Response(JSON.stringify({ 
          error: "Unauthorized: Admin access required", 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200, // Return 200 even for errors to prevent app disruption
        });
      }
    } catch (checkError) {
      logStep(`ERROR: Admin check failed - ${checkError instanceof Error ? checkError.message : String(checkError)}`);
      return new Response(JSON.stringify({ 
        error: "Admin check failed", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even for errors to prevent app disruption
      });
    }
    
    logStep("Admin user authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Parse request with method and action
    let method, action, data;
    try {
      const requestBody = await req.json();
      method = requestBody.method;
      action = requestBody.action;
      data = requestBody.data;
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
    
    // GET methods
    if (method === "GET") {
      if (action === "list-products") {
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
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              price: defaultPrice ? (defaultPrice.unit_amount || 0) / 100 : 0,
              priceId: defaultPrice ? defaultPrice.id : null,
              isActive: product.active,
              metadata: product.metadata,
              features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
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
    }
    
    // POST methods
    if (method === "POST") {
      if (action === "create-product") {
        try {
          const { name, description, price, features, isActive, isDefault } = data;
          
          // Create a new product
          const product = await stripe.products.create({
            name,
            description,
            active: isActive,
            metadata: {
              features: JSON.stringify(features),
              default: isDefault ? 'true' : 'false',
            },
          });
          
          // Create a price for the product
          const priceObj = await stripe.prices.create({
            unit_amount: Math.round(price * 100), // Convert to cents
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
              price: price,
              priceId: priceObj.id,
              isActive: product.active,
              features: features,
              isDefault: isDefault,
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
            status: 200, // Return 200 even for errors to prevent app disruption
          });
        }
      }
      
      if (action === "update-product") {
        try {
          const { id, name, description, price, features, isActive, isDefault, priceId } = data;
          
          // Update the product
          const product = await stripe.products.update(id, {
            name,
            description,
            active: isActive,
            metadata: {
              features: JSON.stringify(features),
              default: isDefault ? 'true' : 'false',
            },
          });
          
          // Update price if needed
          if (priceId) {
            try {
              // We don't update existing prices in Stripe, instead create a new one if price changed
              const currentPrice = await stripe.prices.retrieve(priceId);
              if (currentPrice.unit_amount !== Math.round(price * 100)) {
                // Create a new price
                const newPrice = await stripe.prices.create({
                  unit_amount: Math.round(price * 100),
                  currency: 'brl',
                  product: id,
                  recurring: { interval: 'month' },
                });
                
                // Update the product with the new default price
                await stripe.products.update(id, {
                  default_price: newPrice.id,
                });
                
                // Mark old price as inactive (optional)
                await stripe.prices.update(priceId, { active: false });
              }
            } catch (priceError) {
              logStep(`WARNING: Price update failed - ${priceError instanceof Error ? priceError.message : String(priceError)}`);
              // Continue even if price update fails
            }
          }
          
          logStep("Product updated", { productId: id });
          return new Response(JSON.stringify({ success: true }), {
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
            status: 200, // Return 200 even for errors to prevent app disruption
          });
        }
      }
      
      if (action === "delete-product") {
        try {
          const { id } = data;
          
          // Check if product is set as default
          const product = await stripe.products.retrieve(id);
          if (product.metadata.default === 'true') {
            logStep("ERROR: Cannot delete default product");
            return new Response(JSON.stringify({ 
              error: "Cannot delete default product. Set another product as default first.", 
              success: false 
            }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200, // Return 200 even for errors to prevent app disruption
            });
          }
          
          // Archive the product instead of deleting (Stripe recommended approach)
          await stripe.products.update(id, {
            active: false,
          });
          
          logStep("Product archived", { productId: id });
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
            status: 200, // Return 200 even for errors to prevent app disruption
          });
        }
      }
    }
    
    // If we reach here, the action was not handled
    logStep(`ERROR: Unknown action - ${action}`);
    return new Response(JSON.stringify({ 
      error: `Unknown action: ${action}`, 
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200, // Return 200 even for errors to prevent app disruption
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in manage-plans", { message: errorMessage });
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200, // Return 200 even for errors to prevent app disruption
    });
  }
});
