
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { ResetErrorProps } from '@/types/resetPassword';

const ResetError: React.FC<ResetErrorProps> = ({ errorMessage, onRedirect }) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Erro na redefinição de senha</AlertTitle>
      <AlertDescription>
        <p>{errorMessage || 'O link pode ter expirado ou ser inválido.'}</p>
        <Button 
          onClick={onRedirect}
          className="mt-4"
        >
          Ir para a página de login
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ResetError;
