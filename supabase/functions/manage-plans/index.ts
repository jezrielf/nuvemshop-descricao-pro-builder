
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
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
      
    if (profileError) throw new Error(`Profile error: ${profileError.message}`);
    if (profile.role !== 'admin') throw new Error("Unauthorized: Admin access required");
    
    logStep("Admin user authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Parse request with method and action
    const { method, action, data } = await req.json();
    logStep("Request parsed", { method, action });
    
    // GET methods
    if (method === "GET") {
      if (action === "list-products") {
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
        return new Response(JSON.stringify({ products: formattedProducts }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }
    
    // POST methods
    if (method === "POST") {
      if (action === "create-product") {
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
      }
      
      if (action === "update-product") {
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
        }
        
        logStep("Product updated", { productId: id });
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
      if (action === "delete-product") {
        const { id } = data;
        
        // Check if product is set as default
        const product = await stripe.products.retrieve(id);
        if (product.metadata.default === 'true') {
          throw new Error("Cannot delete default product. Set another product as default first.");
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
      }
    }
    
    // If we reach here, the action was not handled
    throw new Error(`Unknown action: ${action}`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in manage-plans", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
