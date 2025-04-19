
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@14.21.0";
import { corsHeaders, logStep, hasRole, createSupabaseClient } from "./utils.ts";
import { createPlan } from "./planCreation.ts";
import { updatePlan } from "./planUpdate.ts";
import { deletePlan } from "./planDelete.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createSupabaseClient();

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
        status: 200,
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
        status: 200,
      });
    }
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // For the list-products action, we allow public access
    if (method === "GET" && action === "list-products") {
      try {
        const products = await stripe.products.list({
          active: true,
          expand: ['data.default_price'],
          limit: 100,
        });
        
        const formattedProducts = products.data.map(product => {
          const defaultPrice = product.default_price as Stripe.Price;
          let features = [];
          try {
            if (product.metadata.features) {
              const parsedFeatures = JSON.parse(product.metadata.features);
              if (parsedFeatures.length > 0 && 'n' in parsedFeatures[0]) {
                features = parsedFeatures.map((f: any) => ({
                  id: `feature-${features.length}`,
                  name: f.n,
                  included: f.i === 1
                }));
              } else {
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
        
        return new Response(JSON.stringify({ products: formattedProducts, success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        logStep(`ERROR: Failed to list products - ${error instanceof Error ? error.message : String(error)}`);
        return new Response(JSON.stringify({ 
          error: `Failed to list products: ${error instanceof Error ? error.message : String(error)}`, 
          success: false,
          products: [] 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    // For admin actions, check Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header provided");
      return new Response(JSON.stringify({ 
        error: "No authorization header provided", 
        success: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

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
      try {
        if (method === "POST" && action === "create-product") {
          const result = await createPlan(stripe, productData);
          return new Response(JSON.stringify({ success: true, product: result }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
        
        if (method === "PUT" && action === "update-product") {
          const result = await updatePlan(stripe, productId, productData);
          return new Response(JSON.stringify({ success: true, product: result }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }
        
        if (method === "DELETE" && action === "delete-product") {
          const result = await deletePlan(stripe, productId);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
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
      } catch (actionError) {
        return new Response(JSON.stringify({ 
          error: actionError instanceof Error ? actionError.message : String(actionError), 
          success: false 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
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
