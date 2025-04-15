
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NuvemshopTokenResponse {
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
    const tokenData: NuvemshopTokenResponse = await req.json();
    
    if (!tokenData.access_token) {
      throw new Error('Missing access token');
    }

    console.log('Processing Nuvemshop token', { 
      store_id: tokenData.user_id,
      scope: tokenData.scope
    });

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the user and state from the nuvemshop_auth_states table
    const { data: authState, error: stateError } = await supabaseClient
      .from('nuvemshop_auth_states')
      .select('user_id, state')
      .single();

    if (stateError || !authState) {
      console.error('Invalid or missing authentication state:', stateError);
      throw new Error('Invalid authentication state');
    }

    // Fetch store information
    const storeResponse = await fetch(`https://api.tiendanube.com/v1/${tokenData.user_id}/store`, {
      headers: {
        'Authentication': `bearer ${tokenData.access_token}`,
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
      .upsert({
        user_id: authState.user_id,
        store_id: tokenData.user_id,
        name: storeData.name,
        url: storeData.url,
        access_token: tokenData.access_token,
        scope: tokenData.scope
      }, { 
        onConflict: 'store_id',
        // If a store with this store_id already exists, update its details
        updateColumns: ['name', 'url', 'access_token', 'scope', 'connected_at']
      });

    if (insertError) {
      console.error('Failed to save store connection:', insertError);
      throw new Error('Failed to save store connection');
    }

    // Clean up used state
    await supabaseClient
      .from('nuvemshop_auth_states')
      .delete()
      .eq('state', authState.state);

    console.log('Store connection saved successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Nuvemshop token:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

