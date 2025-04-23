
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionEditor } from '../components/SectionEditor';
import { Button } from '@/components/ui/button';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { Plus, Trash2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeaturesContent {
  title: string;
  description: string;
  items: Feature[];
}

interface FeaturesSectionProps {
  content: FeaturesContent;
  onChange: (content: FeaturesContent) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ content, onChange }) => {
  const updateField = (field: keyof FeaturesContent, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newItems = content.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    updateField('items', newItems);
  };

  const addFeature = () => {
    updateField('items', [
      ...content.items,
      { title: '', description: '', image: '' }
    ]);
  };

  const removeFeature = (index: number) => {
    updateField('items', content.items.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Itens</h3>
            <Button 
              onClick={addFeature}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </div>

          <div className="grid gap-6">
            {content.items?.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <SectionEditor
                    label="Título"
                    value={feature.title}
                    onChange={(value) => updateFeature(index, 'title', value)}
                  />
                  
                  <SectionEditor
                    label="Descrição"
                    value={feature.description}
                    onChange={(value) => updateFeature(index, 'description', value)}
                    multiline
                  />

                  {feature.image && (
                    <ImageUploadPreview
                      src={feature.image}
                      alt={feature.title}
                      onEdit={() => {}} // Will be implemented with image manager integration
                      onRemove={() => updateFeature(index, 'image', '')}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
