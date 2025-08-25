import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Set the user context
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { action, storeId, endpoint, method = 'GET', body: requestBody } = await req.json()

    if (action === 'get_products') {
      // Get store access token securely
      const { data: storeData, error: storeError } = await supabaseClient
        .rpc('get_store_for_api_call', { store_uuid: storeId })
        .single()

      if (storeError || !storeData) {
        return new Response(
          JSON.stringify({ error: 'Store not found or access denied' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Make API call to Nuvemshop
      const nuvemshopUrl = `${storeData.url}/api/v1/${storeData.store_id}/products`
      const response = await fetch(nuvemshopUrl, {
        method: 'GET',
        headers: {
          'Authentication': `bearer ${storeData.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      return new Response(
        JSON.stringify(data),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (action === 'update_product') {
      const { productId, description } = requestBody || {}
      
      if (!productId || !description) {
        return new Response(
          JSON.stringify({ error: 'Missing productId or description' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get store access token securely
      const { data: storeData, error: storeError } = await supabaseClient
        .rpc('get_store_for_api_call', { store_uuid: storeId })
        .single()

      if (storeError || !storeData) {
        return new Response(
          JSON.stringify({ error: 'Store not found or access denied' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Make API call to Nuvemshop to update product
      const nuvemshopUrl = `${storeData.url}/api/v1/${storeData.store_id}/products/${productId}`
      const response = await fetch(nuvemshopUrl, {
        method: 'PUT',
        headers: {
          'Authentication': `bearer ${storeData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: { pt: description }
        })
      })

      const data = await response.json()
      
      return new Response(
        JSON.stringify(data),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (action === 'custom_request') {
      // Generic API call handler
      const { data: storeData, error: storeError } = await supabaseClient
        .rpc('get_store_for_api_call', { store_uuid: storeId })
        .single()

      if (storeError || !storeData) {
        return new Response(
          JSON.stringify({ error: 'Store not found or access denied' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Make custom API call to Nuvemshop
      const nuvemshopUrl = `${storeData.url}/api/v1/${storeData.store_id}/${endpoint}`
      const response = await fetch(nuvemshopUrl, {
        method: method,
        headers: {
          'Authentication': `bearer ${storeData.access_token}`,
          'Content-Type': 'application/json',
        },
        ...(requestBody && { body: JSON.stringify(requestBody) })
      })

      const data = await response.json()
      
      return new Response(
        JSON.stringify(data),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})