
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NuvemshopAuthResponse {
  access_token: string;
  scope: string;
  store_id: number;
  user_id: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state } = await req.json();
    
    if (!code || !state) {
      throw new Error('Missing required parameters');
    }

    console.log('Processing Nuvemshop auth with code and state');

    // Validate state from database to prevent CSRF attacks
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: authState, error: stateError } = await supabaseClient
      .from('nuvemshop_auth_states')
      .select('user_id')
      .eq('state', state)
      .single();

    if (stateError || !authState) {
      console.error('Invalid state parameter:', stateError);
      throw new Error('Invalid state parameter');
    }

    console.log('State validated, exchanging code for token');

    // Exchange code for token using the POST endpoint
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Descrição Pro (contato@descricao.pro)'
      },
      body: JSON.stringify({
        client_id: "17194",
        client_secret: Deno.env.get('NUVEMSHOP_CLIENT_SECRET'),
        grant_type: 'authorization_code',
        code
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to exchange code for token:', errorText);
      throw new Error('Failed to exchange code for token');
    }

    const authData: NuvemshopAuthResponse = await tokenResponse.json();
    console.log('Received auth data from Nuvemshop', { 
      store_id: authData.store_id,
      scope: authData.scope
    });

    // Get store information
    const storeResponse = await fetch(`https://api.tiendanube.com/v1/${authData.store_id}/store`, {
      headers: {
        'Authentication': `bearer ${authData.access_token}`,
        'User-Agent': 'Descrição Pro (contato@descricao.pro)'
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

    // Save store connection
    const { error: insertError } = await supabaseClient
      .from('nuvemshop_stores')
      .insert({
        user_id: authState.user_id,
        store_id: authData.store_id,
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

    // Clean up used state
    await supabaseClient
      .from('nuvemshop_auth_states')
      .delete()
      .eq('state', state);

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
