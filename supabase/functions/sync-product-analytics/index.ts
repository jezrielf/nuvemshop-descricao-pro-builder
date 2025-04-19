
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { storeId, productId, userId } = await req.json()

    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get today's date for analytics snapshot
    const today = new Date().toISOString().split('T')[0]

    // Update or create product performance record
    const { error: performanceError } = await supabaseAdmin
      .from('product_performance')
      .upsert({
        user_id: userId,
        product_id: productId,
        store_id: storeId,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,product_id'
      })

    if (performanceError) {
      throw performanceError
    }

    // Create analytics snapshot
    const { error: snapshotError } = await supabaseAdmin
      .from('analytics_snapshots')
      .insert({
        user_id: userId,
        product_id: productId,
        store_id: storeId,
        date: today
      })

    if (snapshotError) {
      throw snapshotError
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
