
import { useState } from 'react';
import { Template } from '@/types/editor';

type DialogType = 'create' | 'edit' | 'delete' | 'view' | null;

export const useTemplateDialogs = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('edit');
  };

  const handleView = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('view');
  };

  const handleDelete = (template: Template) => {
    setSelectedTemplate(template);
    setDialogType('delete');
  };

  const handleCreate = () => {
    setDialogType('create');
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setSelectedTemplate(null);
  };

  return {
    selectedTemplate,
    dialogType,
    handleEdit,
    handleView,
    handleDelete,
    handleCreate,
    handleCloseDialog
  };
};
