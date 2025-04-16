
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🔄 Iniciando função nuvemshop-test-auth');
  
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    console.log('✅ Respondendo a requisição OPTIONS com headers CORS');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extrair o código da requisição
    const { code } = await req.json();
    
    if (!code) {
      console.error('❌ Código de autorização não fornecido');
      throw new Error('Código de autorização é obrigatório');
    }

    console.log('🔄 Testando autenticação com código:', code);
    
    // Obter o client secret do ambiente
    const clientSecret = Deno.env.get('NUVEMSHOP_CLIENT_SECRET');
    if (!clientSecret) {
      console.error('❌ Segredo NUVEMSHOP_CLIENT_SECRET não configurado');
      throw new Error('Client secret não configurado no ambiente');
    }

    // Montando o payload para a API Nuvemshop (equivalente ao curl)
    const payload = {
      client_id: "17194",
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: code
    };
    
    console.log('🔄 Dados a serem enviados:', JSON.stringify(payload));

    // Fazendo a requisição para a API da Nuvemshop
    console.log('🔄 Enviando requisição para a API da Nuvemshop');
    const response = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      },
      body: JSON.stringify(payload)
    });

    console.log('🔄 Resposta recebida com status:', response.status);
    
    // Transformar a resposta em JSON, mesmo se for erro
    let responseData;
    const responseText = await response.text();
    
    try {
      responseData = JSON.parse(responseText);
      console.log('✅ Resposta processada como JSON');
    } catch (e) {
      // Se não for JSON válido, retornar o texto bruto
      responseData = { rawResponse: responseText };
      console.log('⚠️ Resposta não é um JSON válido, retornando texto bruto');
    }

    // Adicionar informações de status à resposta
    const result = {
      ...responseData,
      statusCode: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      _metadata: {
        testTimestamp: new Date().toISOString(),
        wasSuccessful: response.ok
      }
    };

    console.log('✅ Enviando resultado do teste para o cliente');
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('❌ Erro na função nuvemshop-test-auth:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
