
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const NUVEMSHOP_CLIENT_ID = "17194";
const NUVEMSHOP_CLIENT_SECRET = "148c58e8c8e6280d3bc15230ff6758dd3a9ce4fad34d4d0b";

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

    console.log('Preparing request to Nuvemshop token endpoint');
    console.log('Request body:', formData.toString());

    // Make the request to Nuvemshop
    const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
      // Parse JSON response (if we got here, we know it's valid text)
      const data = JSON.parse(responseText);
      console.log('Successfully authenticated with Nuvemshop');
      console.log('User ID:', data.user_id);
      console.log('Access token obtained successfully');

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
