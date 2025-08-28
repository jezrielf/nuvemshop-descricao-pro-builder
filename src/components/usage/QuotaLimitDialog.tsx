
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface QuotaLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  limit: number;
}

export const QuotaLimitDialog: React.FC<QuotaLimitDialogProps> = ({
  open,
  onOpenChange,
  count,
  limit
}) => {
  const navigate = useNavigate();
  const { openCustomerPortal } = useAuth();

  const handleViewPlans = () => {
    onOpenChange(false);
    navigate('/plans');
  };

  const handleCustomerPortal = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Error opening customer portal:', error);
      // Fallback to plans page
      handleViewPlans();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <DialogTitle>Limite de salvamentos atingido</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Você utilizou todos os <strong>{limit} salvamentos gratuitos</strong> na Nuvemshop.
            Para continuar salvando descrições, assine um plano premium.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 py-4">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              ✅ <strong>Salvamentos utilizados:</strong> {count}/{limit}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              🚀 <strong>Com plano premium:</strong> Salvamentos ilimitados
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Fechar
          </Button>
          <Button
            onClick={handleViewPlans}
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Ver Planos
          </Button>
          <Button
            onClick={handleCustomerPortal}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Já sou assinante
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
