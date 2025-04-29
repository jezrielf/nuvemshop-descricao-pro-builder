
import React from 'react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useTemplateStore } from '@/store/templates';
import { NewTemplateDialog } from './NewTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { PreviewTemplateDialog } from './PreviewTemplateDialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const TemplateDialogs: React.FC = () => {
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
  
  const { deleteTemplate: removeTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleDeleteTemplate = async () => {
    if (!deleteTemplate) {
      console.error('No template selected for deletion');
      return;
    }
    
    console.log('Deleting template:', deleteTemplate.id);
    
    try {
      // Delete template from Supabase
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', deleteTemplate.id);
      
      if (error) {
        console.error('Error deleting template:', error);
        toast({
          title: 'Erro ao deletar',
          description: `Não foi possível deletar o template: ${error.message}`,
          variant: 'destructive'
        });
        return;
      }
      
      // Update local state
      removeTemplate(deleteTemplate.id);
      
      toast({
        title: 'Template excluído',
        description: `O template "${deleteTemplate.name}" foi excluído com sucesso.`
      });
      
      // Execute callback if provided
      if (deleteCallback) {
        console.log('Executing delete callback');
        deleteCallback();
      }
      
      closeAllDialogs();
      
      // Refresh the page to update the templates list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Erro ao deletar',
        description: 'Ocorreu um erro ao tentar excluir o template',
        variant: 'destructive'
      });
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
        />
      )}
    </>
  );
};
