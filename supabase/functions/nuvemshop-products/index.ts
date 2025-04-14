
import { serve } from 'https://deno.fresh.dev/std@v1/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { storeId } = await req.json();
    
    if (!storeId) {
      throw new Error('Missing store ID');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get store access token
    const { data: store, error: storeError } = await supabaseClient
      .from('nuvemshop_stores')
      .select('access_token')
      .eq('store_id', storeId)
      .single();

    if (storeError || !store) {
      throw new Error('Store not found');
    }

    // Fetch products from Nuvemshop
    const productsResponse = await fetch(`https://api.tiendanube.com/v1/${storeId}/products`, {
      headers: {
        'Authentication': `bearer ${store.access_token}`,
        'User-Agent': 'Descrição Pro (contato@descricao.pro)'
      }
    });

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await productsResponse.json();

    return new Response(
      JSON.stringify({ products }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
