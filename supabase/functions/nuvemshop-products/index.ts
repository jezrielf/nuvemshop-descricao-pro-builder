
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
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

    console.log(`Fetching products for store ID: ${storeId}`);

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
      console.error('Store not found:', storeError);
      throw new Error('Store not found or access token missing');
    }

    console.log('Found store, fetching products from Nuvemshop API');

    // Fetch products from Nuvemshop with updated headers
    const productsResponse = await fetch(`https://api.tiendanube.com/v1/${storeId}/products?per_page=200&page=1`, {
      headers: {
        'Authentication': `bearer ${store.access_token}`,
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      }
    });

    if (!productsResponse.ok) {
      const errorText = await productsResponse.text();
      console.error('Failed to fetch products:', errorText);
      throw new Error(`Failed to fetch products: ${productsResponse.status} ${productsResponse.statusText}`);
    }

    const products = await productsResponse.json();
    console.log(`Successfully fetched ${products.length} products`);

    return new Response(
      JSON.stringify({ products }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in nuvemshop-products function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
