
import React from 'react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useTemplateStore } from '@/store/templates';
import { NewTemplateDialog } from './NewTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { PreviewTemplateDialog } from './PreviewTemplateDialog';
import { useToast } from '@/hooks/use-toast';

export const TemplateDialogs: React.FC = () => {
  const {
    previewTemplate,
    editTemplate,
    deleteTemplate,
    isNewDialogOpen,
    isPreviewDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    closeAllDialogs
  } = useTemplateDialogs();
  
  const { deleteTemplate: removeTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleDeleteTemplate = async () => {
    if (!deleteTemplate) return;
    
    try {
      console.log('Deleting template:', deleteTemplate.id);
      const success = await removeTemplate(deleteTemplate.id);
      if (success) {
        toast({
          title: "Template excluído",
          description: `O template "${deleteTemplate.name}" foi excluído com sucesso.`,
        });
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o template. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao excluir o template.",
        variant: "destructive",
      });
    } finally {
      closeAllDialogs();
    }
  };

  console.log('TemplateDialogs state:', { 
    isNewDialogOpen, 
    isPreviewDialogOpen, 
    isEditDialogOpen, 
    isDeleteDialogOpen,
    previewTemplate: !!previewTemplate,
    editTemplate: !!editTemplate,
    deleteTemplate: !!deleteTemplate
  });

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
