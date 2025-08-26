
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
    const { accessToken, userId, productId, description } = requestData;

    if (!accessToken || !userId || !productId || !description) {
      return new Response(JSON.stringify({ 
        error: 'Missing required parameters: accessToken, userId, productId, description' 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Updating product description for product ID: ${productId}`);
    console.log(`Using access token: ${accessToken.substring(0, 5)}...`);

    // Prepare the description object in the format Nuvemshop expects
    const descriptionData = typeof description === 'string' 
      ? { "pt": description } 
      : description;

    // Make the request to Nuvemshop API to update the product
    const apiUrl = `https://api.tiendanube.com/v1/${userId}/products/${productId}`;
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'DescricaoPro comercial@weethub.com',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        description: descriptionData
      }),
    });

    // Log response details for debugging
    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response preview:', responseText.substring(0, 200) + '...');

    if (!response.ok) {
      console.error('Error response from Nuvemshop API:', responseText);
      
      let errorKind = 'UNKNOWN_ERROR';
      if (response.status === 401) {
        errorKind = 'AUTH_INVALID';
      } else if (response.status === 429) {
        errorKind = 'RATE_LIMIT';
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to update product in Nuvemshop', 
        details: responseText,
        status: response.status,
        kind: errorKind
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    try {
      // Parse JSON response
      const data = JSON.parse(responseText);
      console.log('Successfully updated product description in Nuvemshop');

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
