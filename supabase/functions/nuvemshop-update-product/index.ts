
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
    const { storeId, productId, description } = await req.json();
    
    if (!storeId) {
      throw new Error('Missing store ID');
    }

    if (!productId) {
      throw new Error('Missing product ID');
    }

    if (!description) {
      throw new Error('Missing description');
    }

    console.log(`Updating product ${productId} for store ID: ${storeId}`);

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

    console.log('Found store, updating product on Nuvemshop API');

    try {
      // Fetch current product data first
      const productResponse = await fetch(`https://api.tiendanube.com/v1/${storeId}/products/${productId}`, {
        headers: {
          'Authentication': `bearer ${store.access_token}`,
          'User-Agent': 'Descrição Pro (contato@descricao.pro)',
          'Content-Type': 'application/json'
        }
      });

      if (!productResponse.ok) {
        const errorText = await productResponse.text();
        console.error('Failed to fetch product:', errorText);
        throw new Error(`Failed to fetch product: ${productResponse.status} ${productResponse.statusText}`);
      }

      const product = await productResponse.json();
      
      // Check if the product has a description object
      if (!product.description || typeof product.description !== 'object') {
        console.error('Product has invalid description format:', product);
        throw new Error('Product has invalid description format');
      }
      
      // Prepare update data - only updating the description
      const updateData = {
        description: {
          ...product.description, // Keep existing descriptions for other languages
        }
      };
      
      // Update the description for each language
      Object.keys(product.description).forEach(lang => {
        updateData.description[lang] = description;
      });

      // Update the product on Nuvemshop
      const updateResponse = await fetch(`https://api.tiendanube.com/v1/${storeId}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authentication': `bearer ${store.access_token}`,
          'User-Agent': 'Descrição Pro (contato@descricao.pro)',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error('Failed to update product:', errorText);
        throw new Error(`Failed to update product: ${updateResponse.status} ${updateResponse.statusText}`);
      }

      // Record the update in our database
      await supabaseClient
        .from('nuvemshop_updates')
        .insert({ 
          user_id: req.headers.get('x-user-id') || null,
          store_id: storeId,
          product_id: productId
        });

      console.log(`Successfully updated product ${productId} for store ${storeId}`);

      return new Response(
        JSON.stringify({ success: true, productId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      // Capture specific API errors and provide better messages
      console.error('Nuvemshop API error:', apiError);
      return new Response(
        JSON.stringify({ 
          error: apiError.message,
          type: 'api_error'
        }),
        { 
          status: 422,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error in nuvemshop-update-product function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
