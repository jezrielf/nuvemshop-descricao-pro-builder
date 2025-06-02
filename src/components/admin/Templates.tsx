
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { TemplatesList } from './templates/TemplatesList';
import { CreateTemplateDialog } from './templates/CreateTemplateDialog';
import { EditTemplateDialog } from './templates/EditTemplateDialog';
import { ViewTemplateDialog } from './templates/ViewTemplateDialog';
import { DeleteTemplateDialog } from './templates/DeleteTemplateDialog';
import { Plus, RefreshCw } from 'lucide-react';

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      setTemplates(formattedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleEdit = (template: Template) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const handleView = (template: Template) => {
    setSelectedTemplate(template);
    setViewDialogOpen(true);
  };

  const handleDelete = (template: Template) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleTemplateCreated = () => {
    loadTemplates();
    setCreateDialogOpen(false);
    toast({
      title: "Sucesso",
      description: "Template criado com sucesso"
    });
  };

  const handleTemplateUpdated = () => {
    loadTemplates();
    setEditDialogOpen(false);
    setSelectedTemplate(null);
    toast({
      title: "Sucesso",
      description: "Template atualizado com sucesso"
    });
  };

  const handleTemplateDeleted = () => {
    loadTemplates();
    setDeleteDialogOpen(false);
    setSelectedTemplate(null);
    toast({
      title: "Sucesso",
      description: "Template excluído com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie os templates do sistema
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={loadTemplates}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Templates</CardTitle>
          <CardDescription>
            Total de {templates.length} templates cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemplatesList
            templates={templates}
            loading={loading}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <CreateTemplateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onTemplateCreated={handleTemplateCreated}
      />

      {selectedTemplate && (
        <>
          <EditTemplateDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            template={selectedTemplate}
            onTemplateUpdated={handleTemplateUpdated}
          />

          <ViewTemplateDialog
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
            template={selectedTemplate}
          />

          <DeleteTemplateDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            template={selectedTemplate}
            onTemplateDeleted={handleTemplateDeleted}
          />
        </>
      )}
    </div>
  );
};
