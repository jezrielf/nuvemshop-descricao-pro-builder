
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useResetPassword } from '@/hooks/useResetPassword';
import ResetPasswordForm from '@/components/auth/reset-password/ResetPasswordForm';
import ResetVerifying from '@/components/auth/reset-password/ResetVerifying';
import ResetSuccess from '@/components/auth/reset-password/ResetSuccess';
import ResetError from '@/components/auth/reset-password/ResetError';
import { ResetPasswordStatus } from '@/types/resetPassword';

const ResetPassword: React.FC = () => {
  const {
    status,
    countdown,
    errorMessage,
    handleSubmit,
    redirectToLogin
  } = useResetPassword();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-6">Redefinição de Senha</h1>
          
          {status === 'verifying' && <ResetVerifying />}
          
          {status === 'ready' && (
            <ResetPasswordForm 
              onSubmit={handleSubmit} 
              errorMessage={errorMessage} 
              isSubmitting={status === 'submitting'} 
            />
          )}
          
          {status === 'success' && (
            <ResetSuccess 
              countdown={countdown} 
              onRedirect={redirectToLogin} 
            />
          )}
          
          {status === 'error' && (
            <ResetError 
              errorMessage={errorMessage} 
              onRedirect={redirectToLogin} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
