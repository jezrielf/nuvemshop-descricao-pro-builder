
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template } from '@/types/editor';
import { TemplatesList } from './templates/TemplatesList';
import { CreateTemplateDialog } from './templates/CreateTemplateDialog';
import { EditTemplateDialog } from './templates/EditTemplateDialog';
import { ViewTemplateDialog } from './templates/ViewTemplateDialog';
import { DeleteTemplateDialog } from './templates/DeleteTemplateDialog';
import { Plus, RefreshCw } from 'lucide-react';

interface TemplatesByCategory {
  [category: string]: Template[];
}

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templatesByCategory, setTemplatesByCategory] = useState<TemplatesByCategory>({});
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
      console.log('Carregando templates do Supabase...');
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar templates:', error);
        throw error;
      }

      console.log('Templates carregados:', data?.length || 0);

      const formattedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      setTemplates(formattedTemplates);

      // Agrupar templates por categoria
      const grouped = formattedTemplates.reduce((acc: TemplatesByCategory, template) => {
        const category = template.category || 'other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});

      setTemplatesByCategory(grouped);
      console.log('Templates agrupados por categoria:', grouped);
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
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

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'supplements': 'Suplementos',
      'clothing': 'Roupas',
      'accessories': 'Acessórios',
      'shoes': 'Calçados',
      'electronics': 'Eletrônicos',
      'energy': 'Energia',
      'casa-decoracao': 'Casa e Decoração',
      'health': 'Saúde',
      'luxury': 'Luxo',
      'adult': 'Adulto',
      'other': 'Outros'
    };
    return labels[category] || category;
  };

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

  const totalTemplates = templates.length;
  const categoriesCount = Object.keys(templatesByCategory).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie os templates do sistema ({totalTemplates} templates em {categoriesCount} categorias)
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

      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p>Carregando templates...</p>
            </div>
          </CardContent>
        </Card>
      ) : totalTemplates === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground">Nenhum template encontrado</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{getCategoryLabel(category)}</span>
                      <Badge variant="secondary">{categoryTemplates.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Templates da categoria {getCategoryLabel(category)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TemplatesList
                  templates={categoryTemplates}
                  loading={false}
                  onEdit={handleEdit}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
