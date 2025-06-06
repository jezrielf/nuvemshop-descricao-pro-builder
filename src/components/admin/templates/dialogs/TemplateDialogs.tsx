
import React, { useState } from 'react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useTemplateStore } from '@/hooks/templates/useTemplateStore';
import { NewTemplateDialog } from './NewTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { PreviewTemplateDialog } from './PreviewTemplateDialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const TemplateDialogs: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const {
    previewTemplate,
    editTemplate,
    deleteTemplate,
    deleteCallback,
    isNewDialogOpen,
    isPreviewDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    closeAllDialogs
  } = useTemplateDialogs();
  
  // Use the hook that already includes enhanced delete functionality
  const { deleteTemplate: removeTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleDeleteTemplate = async () => {
    if (!deleteTemplate) {
      console.error('No template selected for deletion');
      toast({
        title: 'Erro',
        description: 'Nenhum template selecionado para exclusão',
        variant: 'destructive'
      });
      return;
    }
    
    setIsDeleting(true);
    console.log('Starting deletion process for template:', deleteTemplate.id);
    
    try {
      // Use the store's delete method instead of direct Supabase call
      const success = await removeTemplate(deleteTemplate.id);
      
      if (!success) {
        toast({
          title: 'Erro ao deletar',
          description: 'Não foi possível deletar o template',
          variant: 'destructive'
        });
        setIsDeleting(false);
        return;
      }
      
      toast({
        title: 'Template excluído',
        description: `O template "${deleteTemplate.name}" foi excluído com sucesso.`
      });
      
      // Execute callback if provided
      if (deleteCallback) {
        console.log('Executing delete callback');
        deleteCallback();
      }
      
      // Close the dialog
      closeAllDialogs();
    } catch (error) {
      console.error('Exception during template deletion:', error);
      toast({
        title: 'Erro ao deletar',
        description: 'Ocorreu um erro inesperado ao tentar excluir o template',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isNewDialogOpen && (
        <NewTemplateDialog 
          open={isNewDialogOpen} 
          onClose={closeAllDialogs} 
        />
      )}
      
      {isPreviewDialogOpen && previewTemplate && (
        <PreviewTemplateDialog
          open={isPreviewDialogOpen}
          onClose={closeAllDialogs}
          template={previewTemplate}
        />
      )}
      
      {isEditDialogOpen && editTemplate && (
        <EditTemplateDialog
          open={isEditDialogOpen}
          onClose={closeAllDialogs}
          template={editTemplate}
        />
      )}
      
      {isDeleteDialogOpen && deleteTemplate && (
        <DeleteTemplateDialog
          open={isDeleteDialogOpen}
          onClose={closeAllDialogs}
          template={deleteTemplate}
          onDelete={handleDeleteTemplate}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
};
