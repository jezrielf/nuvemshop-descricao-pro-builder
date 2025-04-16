
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
    const { code } = await req.json();
    
    if (!code) {
      console.error('❌ Código de autorização não fornecido');
      throw new Error('Missing required parameters');
    }

    console.log('🔄 Processando autenticação Nuvemshop com código:', code);
    console.log('🔄 Preparando requisição para obter token de acesso');

    const clientSecret = Deno.env.get('NUVEMSHOP_CLIENT_SECRET');
    if (!clientSecret) {
      console.error('❌ Secret NUVEMSHOP_CLIENT_SECRET não configurado');
      throw new Error('Client secret not configured');
    }

    // Exchange code for access token
    console.log('🔄 Enviando requisição para obter token de acesso');
    const tokenResponse = await fetch('https://www.tiendanube.com/apps/authorize/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      },
      body: JSON.stringify({
        client_id: "17194",
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code
      })
    });

    console.log('🔄 Resposta recebida com status:', tokenResponse.status);
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Falha ao trocar código por token:', errorText);
      throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorText}`);
    }

    const authData: NuvemshopAuthResponse = await tokenResponse.json();
    console.log('✅ Dados de autenticação recebidos da Nuvemshop', { 
      user_id: authData.user_id,
      scope: authData.scope
    });

    // Get store information
    console.log('🔄 Buscando informações da loja');
    const storeResponse = await fetch(`https://api.tiendanube.com/v1/${authData.user_id}/store`, {
      headers: {
        'Authentication': `bearer ${authData.access_token}`,
        'User-Agent': 'Descricao PRO (comercial@weethub.com.br)'
      }
    });

    if (!storeResponse.ok) {
      const errorText = await storeResponse.text();
      console.error('❌ Falha ao buscar informações da loja:', errorText);
      throw new Error('Failed to fetch store information');
    }

    const storeData = await storeResponse.json();
    console.log('✅ Dados da loja recuperados', { 
      name: storeData.name,
      url: storeData.url
    });

    // Create Supabase client
    console.log('🔄 Criando cliente Supabase');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('❌ Credenciais do Supabase não configuradas');
      throw new Error('Supabase credentials not configured');
    }
    
    const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Save store connection
    const userId = req.headers.get('x-user-id');
    console.log('🔄 Salvando conexão da loja para usuário:', userId);
    
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
      throw new Error('Failed to save store connection');
    }

    console.log('✅ Conexão da loja salva com sucesso');
    console.log('🔄 Preparando resposta no formato solicitado');

    // Return the exact format requested
    return new Response(
      JSON.stringify({
        access_token: authData.access_token,
        token_type: "bearer",
        scope: "write_products",
        user_id: authData.user_id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Erro na função nuvemshop-auth:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
