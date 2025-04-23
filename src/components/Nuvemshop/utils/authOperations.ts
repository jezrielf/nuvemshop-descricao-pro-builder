
import { supabase } from '@/integrations/supabase/client';
import { NuvemshopAuthResponse } from '../types';

/**
 * Exchange authorization code for access token using Supabase Edge Function
 */
export const exchangeCodeForToken = async (authCode: string): Promise<NuvemshopAuthResponse> => {
  console.log('Processing authorization code:', authCode);
  
  // Call the Edge Function to exchange the code for an access token
  const { data, error: functionError } = await supabase.functions.invoke('nuvemshop-auth', {
    body: { code: authCode },
  });
  
  if (functionError) {
    console.error('Function error:', functionError);
    throw new Error(`Function error: ${functionError.message}`);
  }
  
  if (data.error) {
    console.error('API error:', data.error);
    throw new Error(data.error);
  }
  
  console.log('Authentication success:', data);
  return data;
};

/**
 * Generate the authorization URL for Nuvemshop
 */
export const getNuvemshopAuthUrl = () => {
  // Usar a URL correta de produção com os parâmetros necessários
  const clientId = "17194";
  const redirectUrl = encodeURIComponent(window.location.origin);
  const state = "csrf-code"; // Para proteção CSRF
  
  // Construir a URL correta com parâmetros de redirecionamento
  return `https://www.nuvemshop.com.br/apps/${clientId}/authorize?state=${state}&redirect_uri=${redirectUrl}`;
};
