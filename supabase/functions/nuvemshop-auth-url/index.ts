
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

// Get environment variables
const NUVEMSHOP_CLIENT_ID = Deno.env.get("NUVEMSHOP_CLIENT_ID") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
// Front-end app URL for redirect after OAuth
const APP_URL = Deno.env.get("APP_URL") || "https://app.descricaopro.com.br";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get user from auth header
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate state parameter to prevent CSRF
    const state = crypto.randomUUID();
    
    // Store state in database with user ID for validation
    const { error: stateError } = await supabase
      .from("nuvemshop_auth_states")
      .insert({
        state,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });

    if (stateError) {
      throw new Error(`Error storing state: ${stateError.message}`);
    }

    // Generate OAuth URL
    const redirectUri = `${APP_URL}/nuvemshop/callback`;
    const scopes = "write_products";
    
    const authUrl = `https://www.nuvemshop.com.br/apps/authorize/token` +
      `?client_id=${NUVEMSHOP_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&state=${state}`;

    // Return auth URL to client
    return new Response(
      JSON.stringify({ authUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
