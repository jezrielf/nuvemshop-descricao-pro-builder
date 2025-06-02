
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { AlertTriangle } from 'lucide-react';

interface DeleteTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
  onTemplateDeleted: () => void;
}

export const DeleteTemplateDialog: React.FC<DeleteTemplateDialogProps> = ({
  open,
  onOpenChange,
  template,
  onTemplateDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;

      onTemplateDeleted();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir template",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>Excluir Template</DialogTitle>
          </div>
          <DialogDescription>
            Esta ação não pode ser desfeita. O template será permanentemente removido do sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">{template.name}</p>
            <p className="text-sm text-muted-foreground">Categoria: {template.category}</p>
            <p className="text-sm text-muted-foreground">
              {template.blocks?.length || 0} blocos
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
