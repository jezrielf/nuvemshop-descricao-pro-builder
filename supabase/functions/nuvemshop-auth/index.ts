
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const NUVEMSHOP_CLIENT_ID = "17194";
const NUVEMSHOP_CLIENT_SECRET = "148c58e8c8e6280d3bc15230ff6758dd3a9ce4fad34d4d0b";
const REDIRECT_URI = "https://descricaopro.com.br/editor";

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
    const { code } = requestData;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Authorization code is required' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Received authorization code: ${code}`);

    // Prepare the request to Nuvemshop
    const formData = new URLSearchParams();
    formData.append('client_id', NUVEMSHOP_CLIENT_ID);
    formData.append('client_secret', NUVEMSHOP_CLIENT_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', REDIRECT_URI);

    console.log('Preparing request to Nuvemshop token endpoint');
    console.log('Request body:', formData.toString());

    // Make the request to Nuvemshop
    const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'DescricaoPro comercial@weethub.com'
      },
      body: formData.toString(),
    });

    // Check status and log full response for debugging
    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Full response body:', responseText);

    if (!response.ok) {
      console.error('Error response from Nuvemshop:', responseText);
      return new Response(JSON.stringify({ 
        error: 'Failed to authenticate with Nuvemshop', 
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
      
      // Check if the response contains an error (like invalid_grant)
      if (data.error) {
        console.error('OAuth error in response:', data);
        return new Response(JSON.stringify({ 
          error: 'Failed to authenticate with Nuvemshop', 
          details: data.error_description || data.error,
          status: 400
        }), { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }
      
      console.log('Successfully authenticated with Nuvemshop');
      
      // Add store name to the response data
      // We'll make an additional API call to get the store name
      const storeInfoResponse = await fetch(`https://api.tiendanube.com/v1/${data.user_id}/store`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.access_token}`,
          'User-Agent': 'DescricaoPro comercial@weethub.com',
          'Content-Type': 'application/json',
        },
      });

      let storeName = 'Loja Nuvemshop'; // Default store name
      if (storeInfoResponse.ok) {
        const storeInfo = await storeInfoResponse.json();
        console.log('Store info:', storeInfo);
        // Extract name from store info and normalize to string
        if (storeInfo && storeInfo.name) {
          if (typeof storeInfo.name === 'string') {
            storeName = storeInfo.name;
          } else if (typeof storeInfo.name === 'object' && storeInfo.name.pt) {
            storeName = storeInfo.name.pt;
          }
        }
      } else {
        console.log('Failed to fetch store info, using default name');
      }

      // Append store name to the data
      data.store_name = storeName;

      return new Response(JSON.stringify(data), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Failed to parse Nuvemshop response', 
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
