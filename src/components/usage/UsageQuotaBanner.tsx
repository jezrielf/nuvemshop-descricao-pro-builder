
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsageQuota } from '@/hooks/useUsageQuota';
import { useAuth } from '@/contexts/AuthContext';

export const UsageQuotaBanner: React.FC = () => {
  const { count, remaining, isUnlimited } = useUsageQuota('nuvemshop_saves');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Don't show banner for unlimited users or anonymous users
  if (isUnlimited || !user) {
    return null;
  }

  const handleUpgrade = () => {
    navigate('/plans');
  };

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <Crown className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-amber-800">
          <strong>Plano gratuito:</strong> {count}/3 produtos atualizados na Nuvemshop.
          {remaining > 0 ? ` Restam ${remaining} produtos.` : ' Limite atingido.'}
        </span>
        <Button
          onClick={handleUpgrade}
          size="sm"
          className="ml-4 bg-amber-600 hover:bg-amber-700 text-white"
        >
          Assinar para ilimitado
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
