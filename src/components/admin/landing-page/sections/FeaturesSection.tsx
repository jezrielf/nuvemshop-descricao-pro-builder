
import React, { useState } from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { Save, Plus, Trash2 } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';

interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

interface FeaturesContent {
  title: string;
  description: string;
  items: FeatureItem[];
}

interface FeaturesSectionProps {
  content: FeaturesContent;
  onChange: (content: FeaturesContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  content, 
  onChange, 
  onSave,
  saving = false 
}) => {
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  
  const updateField = (field: 'title' | 'description', value: string) => {
    onChange({ ...content, [field]: value });
  };

  const updateFeatureItem = (index: number, field: keyof FeatureItem, value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...content, items: updatedItems });
  };

  const addFeatureItem = () => {
    const newItem = {
      title: 'Novo Recurso',
      description: 'Descrição do recurso',
      image: '/placeholder.svg'
    };
    onChange({ ...content, items: [...content.items, newItem] });
    toast({
      title: "Item adicionado",
      description: "Um novo recurso foi adicionado. Personalize-o conforme necessário."
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

  const handleImageSelect = (imageUrl: string) => {
    if (activeImageIndex !== null) {
      updateFeatureItem(activeImageIndex, 'image', imageUrl);
      setActiveImageIndex(null);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Seção de Recursos</CardTitle>
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
          <SectionEditor
            label="Descrição"
            value={content.description}
            onChange={(value) => updateField('description', value)}
            multiline
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Itens de Recursos</h3>
            <Button 
              onClick={addFeatureItem} 
              variant="outline" 
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Item
            </Button>
          </div>
          
          {content.items.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                <div className="space-y-2">
                  <ImageUploadPreview 
                    src={item.image}
                    alt={item.title}
                    onEdit={() => setActiveImageIndex(index)}
                    onRemove={() => updateFeatureItem(index, 'image', '/placeholder.svg')}
                  />
                </div>
                <div className="space-y-4">
                  <SectionEditor
                    label="Título"
                    value={item.title}
                    onChange={(value) => updateFeatureItem(index, 'title', value)}
                  />
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
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      
      <ImageLibrary
        onSelectImage={handleImageSelect}
        trigger={<></>}
      />
    </Card>
  );
};
