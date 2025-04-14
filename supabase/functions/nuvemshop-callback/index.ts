
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

// Get environment variables
const NUVEMSHOP_CLIENT_ID = Deno.env.get("NUVEMSHOP_CLIENT_ID") || "";
const NUVEMSHOP_CLIENT_SECRET = Deno.env.get("NUVEMSHOP_CLIENT_SECRET") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

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
    const { code } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ error: "Authorization code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    // Exchange code for access token with Nuvemshop
    const tokenResponse = await fetch("https://www.nuvemshop.com.br/apps/authorize/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: NUVEMSHOP_CLIENT_ID,
        client_secret: NUVEMSHOP_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Nuvemshop token exchange failed: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const { 
      access_token, 
      scope, 
      user_id: storeUserId,
      store_id
    } = tokenData;

    // Get store information
    const storeResponse = await fetch(`https://api.nuvemshop.com.br/v1/${store_id}/store`, {
      headers: {
        "Authentication": `bearer ${access_token}`,
        "User-Agent": "DescricaoPro/1.0",
      },
    });

    if (!storeResponse.ok) {
      const errorText = await storeResponse.text();
      throw new Error(`Failed to get store information: ${errorText}`);
    }

    const storeData = await storeResponse.json();
    
    // Store connection in database
    const { error: storeError } = await supabase
      .from("nuvemshop_stores")
      .upsert({
        user_id: user.id,
        store_id: store_id,
        name: storeData.name,
        url: storeData.url,
        access_token: access_token,
        scope: scope,
        connected_at: new Date().toISOString(),
      }, { onConflict: "store_id" });

    if (storeError) {
      throw new Error(`Error storing connection: ${storeError.message}`);
    }

    // Return store information to client
    return new Response(
      JSON.stringify({
        store: {
          id: store_id,
          name: storeData.name,
          url: storeData.url,
          accessToken: access_token,
          connectedAt: new Date().toISOString(),
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing callback:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
