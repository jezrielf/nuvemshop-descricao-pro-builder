
import React from 'react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useTemplateStore } from '@/store/templates';
import { NewTemplateDialog } from './NewTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { PreviewTemplateDialog } from './PreviewTemplateDialog';

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
  
  const { deleteTemplate: removeTemplate, updateTemplate } = useTemplateStore();

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
          onUpdate={(updatedTemplate) => {
            updateTemplate(editTemplate.id, updatedTemplate);
            closeAllDialogs();
          }}
        />
      )}
      
      {isDeleteDialogOpen && deleteTemplate && (
        <DeleteTemplateDialog
          open={isDeleteDialogOpen}
          onClose={closeAllDialogs}
          template={deleteTemplate}
          onDelete={() => {
            removeTemplate(deleteTemplate.id);
            closeAllDialogs();
          }}
        />
      )}
    </>
  );
};
