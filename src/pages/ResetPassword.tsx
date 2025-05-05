
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

// Define a proper enum or type for status to fix the comparison errors
type ResetPasswordStatus = 'verifying' | 'ready' | 'submitting' | 'success' | 'error';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<ResetPasswordStatus>('verifying');
  const [countdown, setCountdown] = useState(5);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("Verificando token de redefinição de senha...");
        
        // Check for type and token in the URL
        const type = searchParams.get('type');
        
        if (type !== 'recovery') {
          throw new Error('Tipo de token inválido');
        }
        
        // The token will be automatically picked up by the Supabase client
        setStatus('ready');
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
        toast({
          variant: "destructive",
          title: "Link inválido",
          description: "O link de redefinição de senha é inválido ou expirou.",
        });
      }
    };
    
    verifyToken();
  }, [searchParams, navigate, toast]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    setStatus('submitting');
    
    try {
      const { error } = await authService.updatePasswordWithToken(password);
      
      if (error) {
        throw error;
      }
      
      setStatus('success');
      toast({
        title: "Senha redefinida com sucesso!",
        description: "Sua senha foi alterada. Você será redirecionado para o login.",
      });
      
      // Start countdown for redirect
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/auth');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setStatus('error');
      setErrorMessage(error.message || 'Erro ao redefinir senha');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-6">Redefinição de Senha</h1>
          
          {status === 'verifying' && (
            <div className="flex flex-col items-center py-8">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              </div>
              <p className="mt-4 text-gray-600">Verificando seu link de redefinição de senha...</p>
            </div>
          )}
          
          {status === 'ready' && (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="text-left">
                <Label htmlFor="password">Nova senha</Label>
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua nova senha"
                  required
                />
              </div>
              
              <div className="text-left">
                <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                <Input 
                  id="confirm-password"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>
              
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : 'Redefinir senha'}
              </Button>
            </form>
          )}
          
          {status === 'success' && (
            <Alert variant="success" className="bg-green-50 border-green-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Senha redefinida com sucesso!</AlertTitle>
              <AlertDescription className="text-green-700">
                <p>Você será redirecionado para a página de login em {countdown} segundos...</p>
                <Button 
                  onClick={() => navigate('/auth')} 
                  className="mt-4"
                  variant="outline"
                >
                  Ir para login agora
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {status === 'error' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Erro na redefinição de senha</AlertTitle>
              <AlertDescription>
                <p>{errorMessage || 'O link pode ter expirado ou ser inválido.'}</p>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="mt-4"
                >
                  Ir para a página de login
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
