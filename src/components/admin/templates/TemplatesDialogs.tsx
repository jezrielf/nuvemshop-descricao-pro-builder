
import React from 'react';
import { Template } from '@/types/editor';
import { CreateTemplateDialog } from './CreateTemplateDialog';
import { EditTemplateDialog } from './EditTemplateDialog';
import { DeleteTemplateDialog } from './DeleteTemplateDialog';
import { ViewTemplateDialog } from './ViewTemplateDialog';

interface TemplatesDialogsProps {
  dialogType: 'create' | 'edit' | 'delete' | 'view' | null;
  selectedTemplate: Template | null;
  onCloseDialog: () => void;
  onTemplateUpdated: () => void;
  onTemplateCreated: () => void;
  onTemplateDeleted: () => void;
}

export const TemplatesDialogs: React.FC<TemplatesDialogsProps> = ({
  dialogType,
  selectedTemplate,
  onCloseDialog,
  onTemplateUpdated,
  onTemplateCreated,
  onTemplateDeleted
}) => {
  return (
    <>
      <CreateTemplateDialog
        open={dialogType === 'create'}
        onOpenChange={onCloseDialog}
        onTemplateCreated={onTemplateCreated}
      />

      {selectedTemplate && (
        <>
          <EditTemplateDialog
            open={dialogType === 'edit'}
            onOpenChange={onCloseDialog}
            template={selectedTemplate}
            onTemplateUpdated={onTemplateUpdated}
          />
          
          <DeleteTemplateDialog
            open={dialogType === 'delete'}
            onOpenChange={onCloseDialog}
            template={selectedTemplate}
            onTemplateDeleted={onTemplateDeleted}
          />
          
          <ViewTemplateDialog
            open={dialogType === 'view'}
            onOpenChange={onCloseDialog}
            template={selectedTemplate}
          />
        </>
      )}
    </>
  );
};
