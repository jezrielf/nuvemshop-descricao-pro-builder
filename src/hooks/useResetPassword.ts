
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import { ResetPasswordStatus } from '@/types/resetPassword';

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<ResetPasswordStatus>('verifying');
  const [countdown, setCountdown] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("Verificando token de redefinição de senha...");
        
        // Check for type in the URL
        const type = searchParams.get('type');
        
        if (type !== 'recovery') {
          throw new Error('Tipo de token inválido');
        }
        
        // The token will be automatically picked up by the Supabase client
        setStatus('ready');
      } catch (error: any) {
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
  
  const handleSubmit = async (password: string) => {
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
  
  const redirectToLogin = () => {
    navigate('/auth');
  };

  return {
    status,
    countdown,
    errorMessage,
    handleSubmit,
    redirectToLogin,
  };
};
