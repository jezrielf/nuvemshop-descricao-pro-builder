
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
      console.log('Method not allowed:', req.method);
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Get credentials from Supabase secrets
    const NUVEMSHOP_CLIENT_ID = Deno.env.get('NUVEMSHOP_CLIENT_ID');
    const NUVEMSHOP_CLIENT_SECRET = Deno.env.get('NUVEMSHOP_CLIENT_SECRET');
    const REDIRECT_URI = "https://descricaopro.com.br/editor";

    // Validate that we have the required credentials
    if (!NUVEMSHOP_CLIENT_ID || !NUVEMSHOP_CLIENT_SECRET) {
      console.error('Missing Nuvemshop credentials in environment variables');
      return new Response(JSON.stringify({ 
        error: 'Server configuration error: Missing Nuvemshop credentials',
        details: 'Please configure NUVEMSHOP_CLIENT_ID and NUVEMSHOP_CLIENT_SECRET'
      }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log('Using Client ID:', NUVEMSHOP_CLIENT_ID);
    console.log('Redirect URI:', REDIRECT_URI);

    // Parse the request body
    const requestData = await req.json();
    const { code } = requestData;

    if (!code) {
      console.log('No authorization code provided');
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
    console.log('Request body (without secrets):', {
      client_id: NUVEMSHOP_CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    });

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
    console.log('Response status text:', response.statusText);
    
    const responseText = await response.text();
    console.log('Full response body:', responseText);

    if (!response.ok) {
      console.error('Error response from Nuvemshop:', responseText);
      
      // Try to parse error response for better error messages
      let errorDetails = responseText;
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.error_description) {
          errorDetails = errorData.error_description;
        } else if (errorData.message) {
          errorDetails = errorData.message;
        }
      } catch (parseError) {
        console.log('Could not parse error response as JSON');
      }
      
      return new Response(JSON.stringify({ 
        error: 'Failed to authenticate with Nuvemshop', 
        details: errorDetails,
        status: response.status,
        statusText: response.statusText
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    try {
      // Parse JSON response
      const data = JSON.parse(responseText);
      console.log('Successfully authenticated with Nuvemshop');
      console.log('User ID:', data.user_id);
      
      // Add store name to the response data
      // We'll make an additional API call to get the store name
      let storeName = 'Loja Nuvemshop'; // Default store name
      
      try {
        const storeInfoResponse = await fetch(`https://api.tiendanube.com/v1/${data.user_id}/store`, {
          method: 'GET',
          headers: {
            'Authentication': `bearer ${data.access_token}`,
            'User-Agent': 'DescricaoPro comercial@weethub.com',
            'Content-Type': 'application/json',
          },
        });

        if (storeInfoResponse.ok) {
          const storeInfo = await storeInfoResponse.json();
          console.log('Store info retrieved successfully');
          // Extract name from store info and ensure it's a string
          if (storeInfo && storeInfo.name && typeof storeInfo.name === 'string') {
            storeName = storeInfo.name;
          }
        } else {
          console.log('Failed to fetch store info, using default name. Status:', storeInfoResponse.status);
        }
      } catch (storeError) {
        console.error('Error fetching store info:', storeError);
        // Continue with default store name
      }

      // Append store name to the data
      data.store_name = storeName;
      console.log('Final response data prepared with store name:', storeName);

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
