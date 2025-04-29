
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash, Database } from 'lucide-react';
import { Template } from '@/types/editor';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TemplateActionsProps {
  template: Template;
  onTemplateDeleted?: () => void;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ template, onTemplateDeleted }) => {
  const { openPreviewDialog, openEditDialog, openDeleteDialog } = useTemplateDialogs();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Função para deletar diretamente do banco de dados
  const deleteTemplateFromDatabase = async () => {
    try {
      setIsDeleting(true);
      
      // Deletar template diretamente do Supabase
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', template.id);
      
      if (error) {
        console.error('Erro ao deletar template:', error);
        toast({
          title: 'Erro ao deletar',
          description: `Não foi possível deletar o template: ${error.message}`,
          variant: 'destructive'
        });
        return;
      }
      
      toast({
        title: 'Template excluído',
        description: `O template "${template.name}" foi excluído com sucesso.`
      });
      
      // Notificar o componente pai sobre a exclusão 
      if (onTemplateDeleted) {
        onTemplateDeleted();
      }
      
      // Atualizar a lista de templates através de um reload da página
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao deletar template:', error);
      toast({
        title: 'Erro ao deletar',
        description: 'Ocorreu um erro ao tentar excluir o template',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => openPreviewDialog(template)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => openEditDialog(template)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => openDeleteDialog(template)}
      >
        <Trash className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={deleteTemplateFromDatabase}
        disabled={isDeleting}
        title="Deletar diretamente do banco de dados"
        className="text-destructive hover:bg-destructive/10"
      >
        <Database className="h-4 w-4" />
      </Button>
    </div>
  );
};
