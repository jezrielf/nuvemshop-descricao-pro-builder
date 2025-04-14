
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
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
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

    // Initialize Supabase client with the service role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Check if user already exists as a Stripe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    }

    // Get plan ID from request body
    const { planId } = await req.json();
    if (!planId) throw new Error("No plan ID provided");
    logStep("Plan ID found", { planId });

    // Map plan IDs to Stripe prices (using hardcoded values for now)
    // In a real app, you would store these in a database
    let priceId;
    let planName;
    
    switch (planId) {
      case 'premium-plan':
        priceId = 'price_premium'; // Replace with your actual Stripe price ID
        planName = 'Premium';
        break;
      case 'business-plan':
        priceId = 'price_business'; // Replace with your actual Stripe price ID
        planName = 'Empresarial';
        break;
      default:
        throw new Error(`Invalid plan ID: ${planId}`);
    }
    
    // For demo purposes - using test price if actual price IDs not set
    // You should replace this with your actual price IDs from Stripe
    if (priceId === 'price_premium') {
      priceId = 'price_1OtKmDLlcPBEICFiJEzgbh7H'; // Example test price ID
    } else if (priceId === 'price_business') {
      priceId = 'price_1OtKmTLlcPBEICFibCahnQ1V'; // Example test price ID
    }
    
    logStep("Price ID determined", { priceId, planName });

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/plans`,
      metadata: {
        user_id: user.id,
        user_email: user.email,
        plan_id: planId
      }
    });

    logStep("Checkout session created", { sessionUrl: session.url });
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[CREATE-CHECKOUT] ERROR: ${errorMessage}`);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
