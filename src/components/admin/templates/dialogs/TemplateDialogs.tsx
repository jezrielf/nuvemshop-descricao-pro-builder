
import React, { useState } from 'react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useTemplateStore } from '@/store/templates';
import { NewTemplateDialog } from './NewTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { PreviewTemplateDialog } from './PreviewTemplateDialog';
import { useToast } from '@/hooks/use-toast';

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
  
  const { deleteTemplate: removeTemplate, loadTemplates } = useTemplateStore();
  const { toast } = useToast();

  const handleDeleteTemplate = async () => {
    if (!deleteTemplate) {
      console.error('TemplateDialogs.handleDeleteTemplate() - No template selected');
      toast({
        title: 'Erro',
        description: 'Nenhum template selecionado para exclusão',
        variant: 'destructive'
      });
      return;
    }
    
    setIsDeleting(true);
    console.log('TemplateDialogs.handleDeleteTemplate() - Deleting:', deleteTemplate.name);
    
    try {
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
        console.log('TemplateDialogs.handleDeleteTemplate() - Executing callback');
        deleteCallback();
      }
      
      // Reload templates to ensure UI is in sync
      await loadTemplates();
      
      // Close the dialog
      closeAllDialogs();
    } catch (error) {
      console.error('TemplateDialogs.handleDeleteTemplate() - Error:', error);
      toast({
        title: 'Erro ao deletar',
        description: 'Ocorreu um erro inesperado ao tentar excluir o template',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDialogClose = async () => {
    console.log('TemplateDialogs.handleDialogClose() - Refreshing templates');
    closeAllDialogs();
    // Refresh templates when closing dialogs to ensure UI is up to date
    await loadTemplates();
  };

  return (
    <>
      {isNewDialogOpen && (
        <NewTemplateDialog 
          open={isNewDialogOpen} 
          onClose={handleDialogClose} 
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
          onClose={handleDialogClose}
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
