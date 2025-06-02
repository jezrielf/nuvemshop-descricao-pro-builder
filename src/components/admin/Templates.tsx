
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Template } from '@/types/editor';
import { TemplatesHeader } from './templates/TemplatesHeader';
import { TemplatesContent } from './templates/TemplatesContent';
import { TemplatesDialogs } from './templates/TemplatesDialogs';
import { useTemplateOperations } from './templates/hooks/useTemplateOperations';
import { useTemplateDialogs } from './templates/hooks/useTemplateDialogs';

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { toast } = useToast();
  const { loading, loadTemplates, implementFullUpdate } = useTemplateOperations();
  const {
    selectedTemplate,
    dialogType,
    handleEdit,
    handleView,
    handleDelete,
    handleCreate,
    handleCloseDialog
  } = useTemplateDialogs();

  const handleLoadTemplates = async () => {
    try {
      const loadedTemplates = await loadTemplates();
      setTemplates(loadedTemplates);
    } catch (error) {
      // Error is handled in useTemplateOperations
    }
  };

  useEffect(() => {
    handleLoadTemplates();
  }, []);

  const handleImplementFullUpdate = async () => {
    try {
      await implementFullUpdate();
      await handleLoadTemplates();
    } catch (error) {
      // Error is handled in useTemplateOperations
    }
  };

  const handleTemplateUpdated = () => {
    handleLoadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template atualizado com sucesso",
    });
  };

  const handleTemplateCreated = () => {
    handleLoadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template criado com sucesso",
    });
  };

  const handleTemplateDeleted = () => {
    handleLoadTemplates();
    handleCloseDialog();
    toast({
      title: "Sucesso",
      description: "Template deletado com sucesso",
    });
  };

  return (
    <div className="space-y-6">
      <TemplatesHeader
        onRefresh={handleLoadTemplates}
        onCreate={handleCreate}
        onImplementUpdate={handleImplementFullUpdate}
        loading={loading}
      />

      <TemplatesContent
        templates={templates}
        loading={loading}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      <TemplatesDialogs
        dialogType={dialogType}
        selectedTemplate={selectedTemplate}
        onCloseDialog={handleCloseDialog}
        onTemplateUpdated={handleTemplateUpdated}
        onTemplateCreated={handleTemplateCreated}
        onTemplateDeleted={handleTemplateDeleted}
      />
    </div>
  );
};
