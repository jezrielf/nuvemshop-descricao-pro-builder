
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { ResetPasswordFormProps } from '@/types/resetPassword';

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ 
  onSubmit,
  errorMessage,
  isSubmitting 
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset local error
    setLocalError('');
    
    if (password !== confirmPassword) {
      setLocalError('As senhas não coincidem');
      return;
    }
    
    if (password.length < 6) {
      setLocalError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    await onSubmit(password);
  };

  return (
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
      
      {(localError || errorMessage) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{localError || errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : 'Redefinir senha'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
