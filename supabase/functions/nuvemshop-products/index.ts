
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
    console.log(`Using access token: ${accessToken.substring(0, 5)}...`);

    // Make the request to Nuvemshop API with proper headers
    const apiUrl = `https://api.tiendanube.com/v1/${userId}/products`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'DescricaoPro comercial@weethub.com',
        'Content-Type': 'application/json',
      },
    });

    // Log response details for debugging
    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response preview:', responseText.substring(0, 200) + '...');

    if (!response.ok) {
      console.error('Error response from Nuvemshop API:', responseText);
      
      return new Response(JSON.stringify({ 
        error: 'Failed to fetch products from Nuvemshop', 
        details: responseText,
        status: response.status
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    try {
      // Parse JSON response
      const data = JSON.parse(responseText);
      console.log('Successfully fetched products from Nuvemshop');
      console.log('Number of products:', Array.isArray(data) ? data.length : 'not an array');

      return new Response(JSON.stringify(data), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Failed to parse Nuvemshop API response', 
        details: responseText 
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
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
