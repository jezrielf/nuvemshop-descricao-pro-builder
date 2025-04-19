
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const NIMBUS_AUTH_URL = 'https://auth.nuvemshop.com.br/oauth/authorize';
const NIMBUS_TOKEN_URL = 'https://auth.nuvemshop.com.br/oauth/token';

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

    // Troca o código de autorização por um token de acesso
    const tokenResponse = await fetch(NIMBUS_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: '17194', // ID do cliente Nimbus
        client_secret: Deno.env.get('NIMBUS_CLIENT_SECRET'),
        code: code,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error(`Erro ao trocar código por token: ${tokenResponse.statusText}`)
    }

    const tokenData = await tokenResponse.json()

    // Busca informações da loja
    const userResponse = await fetch('https://api.nuvemshop.com.br/v1/user', {
      headers: {
        'Authentication': `bearer ${tokenData.access_token}`,
        'User-Agent': 'Descritor Pro (jezriel@lovable.dev)',
      },
    })

    if (!userResponse.ok) {
      throw new Error(`Erro ao buscar informações do usuário: ${userResponse.statusText}`)
    }

    const userData = await userResponse.json()

    // Retorna os dados necessários
    const responseData = {
      access_token: tokenData.access_token,
      user_id: userData.id.toString(),
      store_name: userData.name,
      expires_in: tokenData.expires_in
    }

    return new Response(JSON.stringify(responseData), { 
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
