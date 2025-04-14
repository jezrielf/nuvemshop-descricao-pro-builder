
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

// Get environment variables
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
    const { storeId, productId, description } = await req.json();
    
    if (!storeId || !productId || !description) {
      return new Response(
        JSON.stringify({ error: "Store ID, product ID, and description are required" }),
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

    // Get store access token
    const { data: storeData, error: storeError } = await supabase
      .from("nuvemshop_stores")
      .select("*")
      .eq("store_id", storeId)
      .eq("user_id", user.id)
      .single();

    if (storeError || !storeData) {
      return new Response(
        JSON.stringify({ error: "Store not found or unauthorized" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update product in Nuvemshop API
    const updateResponse = await fetch(`https://api.nuvemshop.com.br/v1/${storeId}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Authentication": `bearer ${storeData.access_token}`,
        "User-Agent": "DescricaoPro/1.0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
      }),
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw new Error(`Failed to update product: ${errorText}`);
    }

    // Log the update in the database
    const { error: logError } = await supabase
      .from("nuvemshop_updates")
      .insert({
        user_id: user.id,
        store_id: storeId,
        product_id: productId,
        updated_at: new Date().toISOString(),
      });

    if (logError) {
      console.error("Error logging update:", logError);
      // Continue anyway, this is just logging
    }

    // Return success to client
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
