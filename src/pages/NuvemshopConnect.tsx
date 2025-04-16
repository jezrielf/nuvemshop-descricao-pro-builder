
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, CopyIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const NuvemshopConnect: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [testCode, setTestCode] = useState('e39f0b78582c53585b1bafa6a02fc0cb70e94031');
  const [redirectUrl, setRedirectUrl] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    
    // Attempt to extract code from referred URL 
    const extractCodeFromReferrer = () => {
      const urlInput = document.getElementById('url-input') as HTMLInputElement;
      if (!urlInput) return;
      
      try {
        // Get the referrer URL if available
        const referrer = document.referrer;
        if (referrer && referrer.includes('descricaopro.com.br') && referrer.includes('code=')) {
          const url = new URL(referrer);
          const code = url.searchParams.get('code');
          if (code) {
            setTestCode(code);
            urlInput.value = referrer;
            setRedirectUrl(referrer);
            toast({
              title: 'Código de autorização encontrado',
              description: 'Um código de autorização foi extraído da URL de referência.',
            });
          }
        }
      } catch (error) {
        console.error('Error extracting code from referrer:', error);
      }
    };
    
    // Attempt to extract on initial load
    setTimeout(extractCodeFromReferrer, 1000);
  }, [location.search, authenticating, success, navigate, toast]);
  
  // Process the authorization code
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
      setUserId(data.user_id);
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
  
  const handleConnect = () => {
    setLoading(true);
    // Redirect to Nuvemshop authorization URL
    window.location.href = 'https://www.tiendanube.com/apps/17194/authorize?state=csrf-code';
  };
  
  const handleTestCode = async () => {
    if (testCode) {
      await processAuthCode(testCode);
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
    setProducts([]);
    
    toast({
      title: 'Loja desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };
  
  const handleFetchProducts = async () => {
    if (!accessToken || !userId) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Você precisa conectar sua loja primeiro.',
      });
      return;
    }
    
    try {
      setLoadingProducts(true);
      
      const { data, error: functionError } = await supabase.functions.invoke('nuvemshop-products', {
        body: { 
          accessToken, 
          userId 
        },
      });
      
      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(`Function error: ${functionError.message}`);
      }
      
      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }
      
      console.log('Products fetched:', data);
      setProducts(Array.isArray(data) ? data : []);
      
      toast({
        title: 'Produtos carregados',
        description: `${Array.isArray(data) ? data.length : 0} produtos foram carregados da sua loja.`,
      });
    } catch (err: any) {
      console.error('Error fetching products:', err);
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar produtos',
        description: err.message,
      });
    } finally {
      setLoadingProducts(false);
    }
  };
  
  const extractCodeFromUrl = () => {
    try {
      if (!redirectUrl) return;
      
      const url = new URL(redirectUrl);
      const code = url.searchParams.get('code');
      
      if (code) {
        setTestCode(code);
        toast({
          title: 'Código extraído',
          description: 'Código de autorização extraído com sucesso da URL.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Código não encontrado',
          description: 'Não foi possível encontrar um código de autorização na URL fornecida.',
        });
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      toast({
        variant: 'destructive',
        title: 'URL inválida',
        description: 'O formato da URL fornecida é inválido.',
      });
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: 'Copiado!',
          description: 'Texto copiado para a área de transferência.',
        });
      })
      .catch((err) => {
        console.error('Erro ao copiar:', err);
        toast({
          variant: 'destructive',
          title: 'Erro ao copiar',
          description: 'Não foi possível copiar o texto.',
        });
      });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Integração com Nuvemshop</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status da Conexão</CardTitle>
            <CardDescription>
              Conecte sua loja Nuvemshop para importar produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="mr-2">Status:</span>
                {success ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Conectado
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Desconectado
                  </Badge>
                )}
              </div>
              
              {userId && (
                <div>
                  <span className="font-semibold">ID da Loja:</span> {userId}
                </div>
              )}
              
              {error && (
                <div className="text-red-500 mt-2">
                  Erro: {error}
                </div>
              )}
              
              <div className="pt-4">
                {!success ? (
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <Button onClick={handleConnect} disabled={loading || authenticating}>
                        {(loading || authenticating) && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Conectar Loja
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Clique para iniciar o processo de autorização da Nuvemshop
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-sm font-medium mb-2">Colar URL de redirecionamento</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            id="url-input"
                            type="text"
                            placeholder="https://descricaopro.com.br/?code=..."
                            value={redirectUrl}
                            onChange={(e) => setRedirectUrl(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="outline" onClick={extractCodeFromUrl} disabled={!redirectUrl}>
                            Extrair Código
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Cole a URL de redirecionamento que contém o código de autorização (ex: https://descricaopro.com.br/?code=...)
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Testar com código específico</h3>
                      <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            value={testCode}
                            onChange={(e) => setTestCode(e.target.value)}
                            className="pr-10"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0" 
                            onClick={() => copyToClipboard(testCode)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button onClick={handleTestCode} disabled={authenticating || !testCode}>
                          {authenticating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Testar'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={handleDisconnect}>
                      Desconectar Loja
                    </Button>
                    <Button onClick={handleFetchProducts} disabled={loadingProducts}>
                      {loadingProducts ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        'Carregar Produtos'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Produtos da Loja</CardTitle>
              <CardDescription>
                {products.length} produtos encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <ul className="divide-y">
                  {products.map((product) => (
                    <li key={product.id} className="py-3">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        ID: {product.id} | SKU: {product.sku || 'N/A'}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NuvemshopConnect;
