
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
  const [isProcessing, setIsProcessing] = useState(false);
  
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
  
  const { 
    deleteTemplate: removeTemplate,
    createTemplate,
    updateTemplate
  } = useTemplateStore();
  
  const { toast } = useToast();

  const handleCreateTemplate = async (templateData: any) => {
    setIsProcessing(true);
    try {
      console.log('Starting creation process for new template', templateData);
      
      const result = await createTemplate(templateData);
      
      console.log('Template created successfully:', result);
      
      toast({
        title: 'Template criado',
        description: `O template "${result.name}" foi criado com sucesso.`
      });
      
      closeAllDialogs();
      
    } catch (error: any) {
      console.error('Error creating template:', error);
      
      toast({
        title: 'Erro ao criar template',
        description: `Ocorreu um erro ao criar o template: ${error.message || 'Erro desconhecido'}`,
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleUpdateTemplate = async (id: string, templateData: any) => {
    setIsProcessing(true);
    try {
      console.log('Starting update process for template:', id, templateData);
      
      const result = await updateTemplate(id, templateData);
      
      if (!result) {
        throw new Error('Falha ao atualizar o template');
      }
      
      console.log('Template updated successfully:', result);
      
      toast({
        title: 'Template atualizado',
        description: `O template "${result.name}" foi atualizado com sucesso.`
      });
      
      closeAllDialogs();
      
    } catch (error: any) {
      console.error('Error updating template:', error);
      
      toast({
        title: 'Erro ao atualizar template',
        description: `Ocorreu um erro ao atualizar o template: ${error.message || 'Erro desconhecido'}`,
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
      const success = await removeTemplate(deleteTemplate.id);
      
      if (!success) {
        throw new Error('Falha ao excluir o template');
      }
      
      console.log('Template deleted successfully');
      
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
      
    } catch (error: any) {
      console.error('Exception during template deletion:', error);
      toast({
        title: 'Erro ao deletar',
        description: `Não foi possível deletar o template: ${error.message || 'Erro desconhecido'}`,
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
          onCreateTemplate={handleCreateTemplate}
          isProcessing={isProcessing}
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
          onUpdateTemplate={handleUpdateTemplate}
          isProcessing={isProcessing}
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
