import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Parse the request body
    const requestData = await req.json();
    const { accessToken, userId } = requestData;

    if (!accessToken || !userId) {
      return new Response(JSON.stringify({ 
        error: 'Missing required parameters: accessToken, userId' 
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log(`Validating credentials for user ID: ${userId}`);
    console.log(`Using access token: ${accessToken.substring(0, 5)}...`);

    // Test credentials by making a simple API call to get products (just 1 product)
    const apiUrl = `https://api.tiendanube.com/v1/${userId}/products?per_page=1&page=1`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authentication': `bearer ${accessToken}`,
        'User-Agent': 'DescricaoPro comercial@weethub.com',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Validation response status:', response.status);
    const responseText = await response.text();

    if (response.status === 401) {
      console.log('Invalid credentials detected');
      return new Response(JSON.stringify({ 
        ok: false, 
        kind: 'AUTH_INVALID',
        message: 'Token de acesso inválido ou expirado'
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    if (!response.ok) {
      console.error('Unexpected error during validation:', responseText);
      return new Response(JSON.stringify({ 
        ok: false, 
        kind: 'API_ERROR',
        message: 'Erro ao validar credenciais'
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    console.log('Credentials are valid');
    return new Response(JSON.stringify({ 
      ok: true,
      message: 'Credenciais válidas'
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error('Error validating credentials:', error);
    
    return new Response(JSON.stringify({ 
      ok: false,
      kind: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor'
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});