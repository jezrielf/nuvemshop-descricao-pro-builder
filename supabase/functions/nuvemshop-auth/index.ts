
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NuvemshopAuthResponse {
  access_token: string;
  token_type: string;
  scope: string;
  user_id: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code) {
      throw new Error('Missing required parameters');
    }

    console.log('Processing Nuvemshop auth with code:', code);

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      },
      body: JSON.stringify({
        client_id: "17194",
        client_secret: "148c58e8c8e6280d3bc15230ff6758dd3a9ce4fad34d4d0b",
        grant_type: "authorization_code",
        code
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to exchange code for token:', errorText);
      throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorText}`);
    }

    const authData: NuvemshopAuthResponse = await tokenResponse.json();
    console.log('Received auth data from Nuvemshop', { 
      user_id: authData.user_id,
      scope: authData.scope
    });

    // Get store information
    const storeResponse = await fetch(`https://api.tiendanube.com/v1/${authData.user_id}/store`, {
      headers: {
        'Authentication': `bearer ${authData.access_token}`,
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      }
    });

    if (!storeResponse.ok) {
      const errorText = await storeResponse.text();
      console.error('Failed to fetch store information:', errorText);
      throw new Error('Failed to fetch store information');
    }

    const storeData = await storeResponse.json();
    console.log('Retrieved store data', { 
      name: storeData.name,
      url: storeData.url
    });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save store connection
    const { error: insertError } = await supabaseClient
      .from('nuvemshop_stores')
      .insert({
        user_id: req.headers.get('x-user-id'),
        store_id: authData.user_id,
        name: storeData.name,
        url: storeData.url,
        access_token: authData.access_token,
        scope: authData.scope
      });

    if (insertError) {
      console.error('Failed to save store connection:', insertError);
      throw new Error('Failed to save store connection');
    }

    console.log('Store connection saved successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in nuvemshop-auth function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
