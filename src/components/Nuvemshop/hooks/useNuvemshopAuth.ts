
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NuvemshopAuthResponse } from '../types';

export function useNuvemshopAuth() {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('e39f0b78582c53585b1bafa6a02fc0cb70e94031');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing tokens on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('nuvemshop_access_token');
    const storedUserId = localStorage.getItem('nuvemshop_user_id');
    
    if (storedToken && storedUserId) {
      setAccessToken(storedToken);
      setUserId(storedUserId);
      setSuccess(true);
    }
  }, []);

  // Handle the redirect from Nuvemshop with the authorization code
  useEffect(() => {
    const handleAuthorizationCode = async () => {
      // Check for code in URL parameters
      const query = new URLSearchParams(location.search);
      const codeParam = query.get('code');
      
      if (codeParam && !authenticating && !success) {
        await processAuthCode(codeParam);
      }
    };
    
    handleAuthorizationCode();
  }, [location.search, authenticating, success, navigate, toast]);

  const processAuthCode = async (authCode: string) => {
    try {
      setAuthenticating(true);
      setError(null);
      
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
      
      // Store the access token and user ID
      setAccessToken(data.access_token);
      setUserId(data.user_id.toString());
      setSuccess(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('nuvemshop_access_token', data.access_token);
      localStorage.setItem('nuvemshop_user_id', data.user_id.toString());
      
      toast({
        title: 'Loja conectada com sucesso!',
        description: 'Sua loja Nuvemshop foi conectada com sucesso.',
      });
      
      // Remove the code from the URL to prevent re-authentication on page refresh
      navigate('/nuvemshop-connect', { replace: true });
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar',
        description: err.message,
      });
    } finally {
      setAuthenticating(false);
    }
  };

  const handleConnect = () => {
    setLoading(true);
    // Redirect to Nuvemshop authorization URL with the specific link
    window.location.href = 'https://www.tiendanube.com/apps/17194/authorize?state=csrf-code';
  };
  
  const handleTestCode = async (code: string) => {
    if (code) {
      await processAuthCode(code);
    }
  };
  
  const handleDisconnect = () => {
    // Clear stored tokens
    localStorage.removeItem('nuvemshop_access_token');
    localStorage.removeItem('nuvemshop_user_id');
    
    // Reset state
    setAccessToken(null);
    setUserId(null);
    setSuccess(false);
    
    toast({
      title: 'Loja desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };

  return {
    loading,
    authenticating,
    error,
    success,
    accessToken,
    userId,
    testCode,
    setTestCode,
    processAuthCode,
    handleConnect,
    handleTestCode,
    handleDisconnect
  };
}
