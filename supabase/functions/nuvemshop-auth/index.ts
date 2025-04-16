
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NuvemshopAuthResponse {
  access_token: string;
  token_type: string;
  scope: string;
  user_id: number;
}

serve(async (req) => {
  console.log('🔄 Iniciando função nuvemshop-auth');
  
  if (req.method === 'OPTIONS') {
    console.log('✅ Respondendo a requisição OPTIONS com headers CORS');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extrair e validar os dados da requisição
    let requestData;
    try {
      requestData = await req.json();
      console.log('🔄 Dados recebidos na requisição:', JSON.stringify(requestData));
    } catch (error) {
      console.error('❌ Erro ao analisar JSON da requisição:', error);
      throw new Error('Falha ao analisar dados da requisição: ' + error.message);
    }
    
    const { code } = requestData;
    
    if (!code) {
      console.error('❌ Código de autorização não fornecido');
      throw new Error('Parâmetro obrigatório "code" não encontrado na requisição');
    }

    console.log('🔄 Processando autenticação Nuvemshop com código:', code);
    
    // Verificar e obter o Client Secret
    const clientSecret = Deno.env.get('NUVEMSHOP_CLIENT_SECRET');
    if (!clientSecret) {
      console.error('❌ Secret NUVEMSHOP_CLIENT_SECRET não configurado');
      throw new Error('Client secret não configurado no ambiente. Entre em contato com o administrador.');
    }

    // Montar request para obter token
    console.log('🔄 Preparando requisição para obter token de acesso');
    const tokenRequestBody = {
      client_id: "17194",
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code
    };
    
    console.log('🔄 Corpo da requisição para obter token:', JSON.stringify(tokenRequestBody));

    // Exchange code for access token
    console.log('🔄 Enviando requisição para obter token de acesso');
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      },
      body: JSON.stringify(tokenRequestBody)
    });

    console.log('🔄 Resposta recebida com status:', tokenResponse.status);
    
    if (!tokenResponse.ok) {
      let errorText;
      try {
        errorText = await tokenResponse.text();
        console.error('❌ Resposta de erro do servidor Nuvemshop:', errorText);
      } catch (e) {
        errorText = 'Não foi possível ler a resposta de erro';
        console.error('❌ Não foi possível ler a resposta de erro:', e);
      }
      
      throw new Error(`Falha ao trocar código por token: ${tokenResponse.status} ${errorText}`);
    }

    // Analisar resposta de autenticação
    let authData: NuvemshopAuthResponse;
    try {
      authData = await tokenResponse.json();
      console.log('✅ Dados de autenticação recebidos da Nuvemshop', { 
        user_id: authData.user_id,
        scope: authData.scope
      });
    } catch (error) {
      console.error('❌ Erro ao analisar resposta JSON de autenticação:', error);
      throw new Error('Falha ao processar resposta de autenticação: ' + error.message);
    }

    // Obter informações da loja
    console.log('🔄 Buscando informações da loja para user_id:', authData.user_id);
    const storeResponse = await fetch(`https://api.tiendanube.com/v1/${authData.user_id}/store`, {
      headers: {
        'Authentication': `bearer ${authData.access_token}`,
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      }
    });

    if (!storeResponse.ok) {
      let errorText;
      try {
        errorText = await storeResponse.text();
        console.error('❌ Resposta de erro ao buscar informações da loja:', errorText);
      } catch (e) {
        errorText = 'Não foi possível ler a resposta de erro';
        console.error('❌ Não foi possível ler a resposta de erro:', e);
      }
      
      throw new Error(`Falha ao buscar informações da loja: ${storeResponse.status} ${errorText}`);
    }

    let storeData;
    try {
      storeData = await storeResponse.json();
      console.log('✅ Dados da loja recuperados', { 
        name: storeData.name,
        url: storeData.url
      });
    } catch (error) {
      console.error('❌ Erro ao analisar resposta JSON da loja:', error);
      throw new Error('Falha ao processar dados da loja: ' + error.message);
    }

    // Configurar cliente Supabase
    console.log('🔄 Criando cliente Supabase');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('❌ Credenciais do Supabase não configuradas');
      throw new Error('Credenciais do Supabase não configuradas. Entre em contato com o administrador.');
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Obter e validar usuário autenticado
    const userId = req.headers.get('x-user-id');
    if (!userId) {
      console.error('❌ ID do usuário não encontrado nos headers');
      throw new Error('ID do usuário não encontrado. Verifique se está autenticado.');
    }
    
    console.log('🔄 Salvando conexão da loja para usuário:', userId);
    
    // Inserir ou atualizar informações da loja
    const { error: insertError } = await supabaseClient
      .from('nuvemshop_stores')
      .insert({
        user_id: userId,
        store_id: authData.user_id,
        name: storeData.name,
        url: storeData.url,
        access_token: authData.access_token,
        scope: authData.scope
      });

    if (insertError) {
      console.error('❌ Falha ao salvar conexão da loja:', insertError);
      throw new Error('Falha ao salvar conexão da loja: ' + insertError.message);
    }

    console.log('✅ Conexão da loja salva com sucesso');
    console.log('🔄 Preparando resposta no formato solicitado');

    // Return the exact format requested
    return new Response(
      JSON.stringify({
        access_token: authData.access_token,
        token_type: "bearer",
        scope: authData.scope,
        user_id: authData.user_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Erro na função nuvemshop-auth:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack, // Incluir stack trace para depuração
        timestamp: new Date().toISOString()
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

