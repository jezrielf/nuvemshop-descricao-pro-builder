
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { ResetSuccessProps } from '@/types/resetPassword';

const ResetSuccess: React.FC<ResetSuccessProps> = ({ countdown, onRedirect }) => {
  return (
    <Alert variant="success" className="bg-green-50 border-green-300">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <AlertTitle className="text-green-800">Senha redefinida com sucesso!</AlertTitle>
      <AlertDescription className="text-green-700">
        <p>Você será redirecionado para a página de login em {countdown} segundos...</p>
        <Button 
          onClick={onRedirect}
          className="mt-4"
          variant="outline"
        >
          Ir para login agora
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ResetSuccess;
