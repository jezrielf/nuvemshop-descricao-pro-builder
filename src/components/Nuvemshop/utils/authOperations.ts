
import { supabase } from '@/integrations/supabase/client';
import { NuvemshopAuthResponse } from '../types';

/**
 * Exchange authorization code for access token using Supabase Edge Function
 */
export const exchangeCodeForToken = async (authCode: string): Promise<NuvemshopAuthResponse> => {
  console.log('Processing authorization code:', authCode);
  
  try {
    // Call the Edge Function to exchange the code for an access token
    const { data, error: functionError } = await supabase.functions.invoke('nuvemshop-auth', {
      body: { code: authCode },
    });
    
    if (functionError) {
      console.error('Function error:', functionError);
      throw new Error(`Erro na conexão: ${functionError.message}`);
    }
    
    if (data?.error) {
      console.error('API error:', data.error);
      
      // Provide more user-friendly error messages
      let userMessage = 'Erro ao conectar com a Nuvemshop';
      if (data.details) {
        if (typeof data.details === 'string' && data.details.includes('invalid_grant')) {
          userMessage = 'Código de autorização inválido ou expirado. Tente conectar novamente.';
        } else if (typeof data.details === 'string' && data.details.includes('unauthorized')) {
          userMessage = 'Credenciais inválidas. Verifique a configuração do app na Nuvemshop.';
        } else {
          userMessage = `${userMessage}: ${data.details}`;
        }
      }
      
      throw new Error(userMessage);
    }
    
    if (!data) {
      throw new Error('Resposta vazia da Nuvemshop. Tente novamente.');
    }
    
    console.log('Authentication success:', data);
    return data;
  } catch (error) {
    console.error('Error in exchangeCodeForToken:', error);
    // Re-throw the error with additional context if needed
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Erro desconhecido ao conectar com a Nuvemshop');
    }
  }
};

/**
 * Generate the authorization URL for Nuvemshop
 */
export const getNuvemshopAuthUrl = () => {
  const clientId = "17194";
  // Use the exact URL that is registered in the Nuvemshop app settings
  const redirectUri = "https://descricaopro.com.br/editor";
  const encodedRedirectUri = encodeURIComponent(redirectUri);
  const state = "csrf-code";
  
  console.log("Redirect URL for Nuvemshop:", redirectUri);
  
  return `https://www.nuvemshop.com.br/apps/${clientId}/authorize?state=${state}&redirect_uri=${encodedRedirectUri}`;
};

/**
 * Detect if the current URL or referrer contains an authorization code
 */
export const detectAuthCode = (): string | null => {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const codeFromUrl = urlParams.get('code');
  
  if (codeFromUrl) {
    console.log("Código de autorização detectado na URL atual:", codeFromUrl);
    return codeFromUrl;
  }
  
  // Then check the referrer
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      const codeFromReferrer = referrerUrl.searchParams.get('code');
      
      if (codeFromReferrer) {
        console.log("Código de autorização detectado no referrer:", codeFromReferrer);
        return codeFromReferrer;
      }
    } catch (error) {
      console.error("Erro ao processar referrer URL:", error);
    }
  }
  
  return null;
};

/**
 * Clear authorization code from URL without navigation 
 */
export const clearAuthCodeFromUrl = () => {
  if (window.history && window.history.replaceState) {
    // First, get the current URL and create a URL object
    const currentUrl = new URL(window.location.href);
    
    // Remove both 'code' and 'state' parameters
    currentUrl.searchParams.delete('code');
    currentUrl.searchParams.delete('state');
    
    // Convert back to string, keeping only the necessary parts
    const cleanUrl = currentUrl.pathname + 
                    (currentUrl.searchParams.toString() ? '?' + currentUrl.searchParams.toString() : '') +
                    currentUrl.hash;
    
    // Update browser history without navigating
    window.history.replaceState({}, document.title, cleanUrl);
    console.log("Código de autorização e parâmetros de estado removidos da URL");
  }
};

/**
 * Test connection to Nuvemshop API
 */
export const testNuvemshopConnection = async (): Promise<boolean> => {
  try {
    // Simple test to check if we can reach Nuvemshop
    const response = await fetch('https://www.tiendanube.com/apps/', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    
    return true; // If we reach here, connection is working
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
