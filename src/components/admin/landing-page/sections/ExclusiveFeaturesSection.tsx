
import React, { useState } from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExclusiveFeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface ExclusiveFeaturesContent {
  title: string;
  items: ExclusiveFeatureItem[];
}

interface ExclusiveFeaturesSectionProps {
  content: ExclusiveFeaturesContent;
  onChange: (content: ExclusiveFeaturesContent) => void;
  onSave: () => void;
  saving?: boolean;
}

const AVAILABLE_ICONS = [
  'Sparkles', 'BarChart2', 'Search', 'Zap', 'ShieldCheck', 'RefreshCw', 
  'Check', 'Star', 'Award', 'Rocket', 'Heart', 'Clock'
];

export const ExclusiveFeaturesSection: React.FC<ExclusiveFeaturesSectionProps> = ({
  content,
  onChange,
  onSave,
  saving = false
}) => {
  const { toast } = useToast();
  
  const updateField = (field: 'title', value: string) => {
    onChange({ ...content, [field]: value });
  };

  const updateFeatureItem = (index: number, field: keyof ExclusiveFeatureItem, value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...content, items: updatedItems });
  };

  const addFeatureItem = () => {
    const newItem = {
      icon: 'Star',
      title: 'Novo Recurso',
      description: 'Descrição do recurso exclusivo'
    };
    onChange({ ...content, items: [...content.items, newItem] });
    toast({
      title: "Item adicionado",
      description: "Um novo recurso exclusivo foi adicionado."
    });
  };

  const removeFeatureItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    onChange({ ...content, items: updatedItems });
    toast({
      title: "Item removido",
      description: "O recurso foi removido com sucesso."
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Recursos Exclusivos</CardTitle>
        <Button 
          onClick={onSave} 
          disabled={saving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <SectionEditor
            label="Título da Seção"
            value={content.title}
            onChange={(value) => updateField('title', value)}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recursos Exclusivos</h3>
            <Button 
              onClick={addFeatureItem} 
              variant="outline" 
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Recurso
            </Button>
          </div>
          
          {content.items.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ícone</label>
                    <Select
                      value={item.icon}
                      onValueChange={(value) => updateFeatureItem(index, 'icon', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um ícone" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_ICONS.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <SectionEditor
                      label="Título"
                      value={item.title}
                      onChange={(value) => updateFeatureItem(index, 'title', value)}
                    />
                  </div>
                </div>
                <SectionEditor
                  label="Descrição"
                  value={item.description}
                  onChange={(value) => updateFeatureItem(index, 'description', value)}
                  multiline
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={() => removeFeatureItem(index)} 
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remover
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
