import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, EyeOff, Download, Upload, Copy } from 'lucide-react';
import { Template, ProductCategory } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';
import { useToast } from '@/hooks/use-toast';
import { ImportTemplateDialog } from './ImportTemplateDialog';

interface TemplateBuilderHeaderProps {
  template: Template;
  onTemplateUpdate: (template: Template) => void;
  isNewTemplate: boolean;
  previewMode: boolean;
  onPreviewToggle: () => void;
}

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: 'supplements', label: 'Suplementos' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'accessories', label: 'Acessórios' },
  { value: 'shoes', label: 'Calçados' },
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'energy', label: 'Energia' },
  { value: 'casa-decoracao', label: 'Casa e Decoração' },
  { value: 'health', label: 'Saúde' },
  { value: 'luxury', label: 'Luxo' },
  { value: 'adult', label: 'Adulto' },
  { value: 'other', label: 'Outros' }
];

export const TemplateBuilderHeader: React.FC<TemplateBuilderHeaderProps> = ({
  template,
  onTemplateUpdate,
  isNewTemplate,
  previewMode,
  onPreviewToggle
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const navigate = useNavigate();
  const { createTemplate, updateTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!template.name.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, adicione um nome ao template',
        variant: 'destructive'
      });
      return;
    }

    setIsSaving(true);
    
    try {
      if (isNewTemplate) {
        await createTemplate({
          name: template.name,
          category: template.category,
          blocks: template.blocks
        });
        toast({
          title: 'Template criado',
          description: 'O template foi criado com sucesso'
        });
      } else {
        await updateTemplate(template.id, {
          name: template.name,
          category: template.category,
          blocks: template.blocks
        });
        toast({
          title: 'Template salvo',
          description: 'As alterações foram salvas com sucesso'
        });
      }
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o template',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDuplicate = () => {
    const duplicatedTemplate = {
      ...template,
      id: crypto.randomUUID(),
      name: `${template.name} (Cópia)`,
      blocks: template.blocks.map(block => ({
        ...block,
        id: crypto.randomUUID()
      }))
    };
    
    onTemplateUpdate(duplicatedTemplate);
    toast({
      title: 'Template duplicado',
      description: 'Uma cópia do template foi criada'
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Template exportado',
      description: 'O template foi baixado como arquivo JSON'
    });
  };

  return (
    <>
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin-templates')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-4">
              <Input
                value={template.name}
                onChange={(e) => onTemplateUpdate({ ...template, name: e.target.value })}
                placeholder="Nome do template"
                className="min-w-64"
              />
              
              <Select 
                value={template.category} 
                onValueChange={(value: ProductCategory) => 
                  onTemplateUpdate({ ...template, category: value })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImportDialog(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Importar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleDuplicate}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Duplicar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviewToggle}
              className="flex items-center gap-2"
            >
              {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {previewMode ? 'Editar' : 'Preview'}
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>
      
      <ImportTemplateDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={onTemplateUpdate}
      />
    </>
  );
};