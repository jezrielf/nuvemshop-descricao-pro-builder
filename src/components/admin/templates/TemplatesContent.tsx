
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Template } from '@/types/editor';
import { TemplatesList } from './TemplatesList';

interface TemplatesContentProps {
  templates: Template[];
  loading: boolean;
  onEdit: (template: Template) => void;
  onView: (template: Template) => void;
  onDelete: (template: Template) => void;
}

export const TemplatesContent: React.FC<TemplatesContentProps> = ({
  templates,
  loading,
  onEdit,
  onView,
  onDelete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Templates Disponíveis</CardTitle>
        <CardDescription>
          Lista de todos os templates criados no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TemplatesList
          templates={templates}
          loading={loading}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
};
