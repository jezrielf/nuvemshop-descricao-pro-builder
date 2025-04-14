
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Initialize Supabase client with the service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    // Get the token from the auth header
    const token = authHeader.replace("Bearer ", "");
    
    try {
      // Try to get the user from the token
      const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
      if (userError) throw new Error(`Authentication error: ${userError.message}`);
      
      const user = userData.user;
      if (!user?.email) throw new Error("User not authenticated or email not available");
      logStep("User authenticated", { userId: user.id, email: user.email });

      const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
      
      // Check if the customer exists in Stripe
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      
      if (customers.data.length === 0) {
        logStep("No customer found, updating unsubscribed state");
        
        // Create a default response when the customer is not found
        return new Response(
          JSON.stringify({
            subscribed: false,
            subscription_tier: "free",
            subscription_end: null,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
      
      const customerId = customers.data[0].id;
      logStep("Found Stripe customer", { customerId });
      
      // Get customer's subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      
      if (subscriptions.data.length === 0) {
        logStep("No active subscriptions found");
        
        return new Response(
          JSON.stringify({
            subscribed: false,
            subscription_tier: "free",
            subscription_end: null,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
      
      // Get the subscription details
      const subscription = subscriptions.data[0];
      logStep("Found active subscription", { subscriptionId: subscription.id });
      
      // Get the product ID from the subscription
      const productId = subscription.items.data[0].price.product;
      
      // Get the product details
      const product = await stripe.products.retrieve(productId as string);
      logStep("Retrieved product details", { 
        productId, 
        name: product.name 
      });
      
      // Get the subscription tier from the product metadata or name
      const subscriptionTier = product.metadata.tier || product.name.toLowerCase();
      
      return new Response(
        JSON.stringify({
          subscribed: true,
          subscription_tier: subscriptionTier,
          subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (authError) {
      logStep("ERROR in check-subscription", { message: authError instanceof Error ? authError.message : String(authError) });
      
      // If there's an authentication error, return a default response
      // This prevents blocking the application when auth fails
      return new Response(
        JSON.stringify({
          subscribed: false,
          subscription_tier: "free",
          subscription_end: null,
          error: "Authentication failed, using default free tier"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200, // Return 200 instead of error to prevent app disruption
        }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    
    // Always return a 200 response with default values to prevent app disruption
    return new Response(
      JSON.stringify({ 
        subscribed: false, 
        subscription_tier: "free", 
        subscription_end: null,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 instead of error to prevent app disruption
      }
    );
  }
});
