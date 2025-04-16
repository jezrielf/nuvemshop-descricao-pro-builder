
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Parse the request body
    const requestData = await req.json();
    const { accessToken, userId } = requestData;

    if (!accessToken || !userId) {
      return new Response(JSON.stringify({ error: 'Access token and user ID are required' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Fetching products for user ID: ${userId}`);

    // Make the request to Nuvemshop API
    const response = await fetch(`https://api.tiendanube.com/v1/${userId}/products`, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'DescricaoPro comercial@weethub.com',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Nuvemshop:', errorText);
      
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch products from Nuvemshop', 
        details: errorText 
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const data = await response.json();
    console.log('Successfully fetched products from Nuvemshop');

    return new Response(JSON.stringify(data), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
