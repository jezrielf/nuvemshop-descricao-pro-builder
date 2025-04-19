
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { code } = await req.json()

    if (!code) {
      return new Response(JSON.stringify({ error: 'Código de autorização da Nimbus é obrigatório' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    console.log(`Código de autorização Nimbus recebido: ${code}`)

    // TODO: Implementar troca de código por token na API da Nimbus
    const mockData = {
      access_token: "nimbus_mock_token",
      user_id: "nimbus_user_123",
      store_name: "Loja Teste Nimbus",
      expires_in: 3600
    }

    return new Response(JSON.stringify(mockData), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Erro interno do servidor', 
      details: error.message 
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }
})
