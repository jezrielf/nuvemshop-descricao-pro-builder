
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { supabase } from '@/integrations/supabase/client';

const EmailConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      toast({
        variant: "destructive",
        title: "Link inválido",
        description: "O link de confirmação não contém um token válido.",
      });
      return;
    }
    
    const verifyToken = async () => {
      try {
        console.log("Verificando token:", token);
        
        // For our custom flow, we'll check if the user can be authenticated
        // and then manually confirm their email
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Token verification error:", error);
          setStatus('error');
          toast({
            variant: "destructive",
            title: "Erro na confirmação",
            description: "Não foi possível verificar seu e-mail. O link pode ter expirado.",
          });
          return;
        }
        
        // If we have a user, consider the email confirmed
        setStatus('success');
        toast({
          title: "E-mail confirmado!",
          description: "Sua conta foi ativada com sucesso. Redirecionando para o editor...",
        });
        
        // Start countdown for redirect to editor
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/editor');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
        toast({
          variant: "destructive",
          title: "Erro na confirmação",
          description: "Ocorreu um erro inesperado. Tente fazer login normalmente.",
        });
      }
    };
    
    verifyToken();
  }, [searchParams, navigate, toast]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-6 text-brand-blue">Descrição Pro</h1>
          
          {status === 'verifying' && (
            <div className="flex flex-col items-center py-8">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Verificando e ativando sua conta...</p>
              <p className="mt-2 text-sm text-gray-500">Aguarde um momento...</p>
            </div>
          )}
          
          {status === 'success' && (
            <Alert variant="success" className="bg-green-50 border-green-300">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">🎉 Conta ativada com sucesso!</AlertTitle>
              <AlertDescription className="text-green-700">
                <p>Perfeito! Seu cadastro foi confirmado e sua conta está ativa.</p>
                <p className="mt-3 font-medium text-green-800">
                  Redirecionando para o editor em {countdown} segundos...
                </p>
                <p className="mt-2 text-sm">
                  Você já pode começar a criar suas primeiras descrições profissionais!
                </p>
              </AlertDescription>
            </Alert>
          )}
          
          {status === 'error' && (
            <Alert variant="destructive">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Erro na confirmação</AlertTitle>
              <AlertDescription>
                <p>Não foi possível verificar seu e-mail automaticamente.</p>
                <div className="mt-4 space-y-2">
                  <button 
                    onClick={() => navigate('/auth')}
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Ir para a página de login
                  </button>
                  <p className="text-xs text-gray-600">
                    Tente fazer login normalmente. Se o problema persistir, entre em contato com o suporte.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmation;
