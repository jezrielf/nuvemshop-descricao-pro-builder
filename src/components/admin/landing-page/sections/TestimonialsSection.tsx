
import React, { useState } from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { Save, Plus, Trash2 } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';

interface TestimonialItem {
  name: string;
  company: string;
  image: string;
  text: string;
}

interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}

interface TestimonialsSectionProps {
  content: TestimonialsContent;
  onChange: (content: TestimonialsContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  content, 
  onChange, 
  onSave,
  saving = false 
}) => {
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  
  const updateField = (field: 'title', value: string) => {
    onChange({ ...content, [field]: value });
  };

  const updateTestimonialItem = (index: number, field: keyof TestimonialItem, value: string) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange({ ...content, items: updatedItems });
  };

  const addTestimonialItem = () => {
    const newItem = {
      name: 'Nome do Cliente',
      company: 'Nome da Empresa',
      image: '/placeholder.svg',
      text: 'Depoimento do cliente sobre nossa plataforma.'
    };
    onChange({ ...content, items: [...content.items, newItem] });
    toast({
      title: "Depoimento adicionado",
      description: "Um novo depoimento foi adicionado."
    });
  };

  const removeTestimonialItem = (index: number) => {
    const updatedItems = content.items.filter((_, i) => i !== index);
    onChange({ ...content, items: updatedItems });
    toast({
      title: "Depoimento removido",
      description: "O depoimento foi removido com sucesso."
    });
  };

  const handleImageSelect = (imageUrl: string) => {
    if (activeImageIndex !== null) {
      updateTestimonialItem(activeImageIndex, 'image', imageUrl);
      setActiveImageIndex(null);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Depoimentos</CardTitle>
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
            <h3 className="text-lg font-medium">Depoimentos de Clientes</h3>
            <Button 
              onClick={addTestimonialItem} 
              variant="outline" 
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Depoimento
            </Button>
          </div>
          
          {content.items.map((item, index) => (
            <Card key={index} className="p-4">
              <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
                <div className="space-y-4">
                  <ImageUploadPreview 
                    src={item.image}
                    alt={item.name}
                    onEdit={() => setActiveImageIndex(index)}
                    onRemove={() => updateTestimonialItem(index, 'image', '/placeholder.svg')}
                  />
                </div>
                <div className="space-y-4">
                  <SectionEditor
                    label="Nome"
                    value={item.name}
                    onChange={(value) => updateTestimonialItem(index, 'name', value)}
                  />
                  <SectionEditor
                    label="Empresa/Negócio"
                    value={item.company}
                    onChange={(value) => updateTestimonialItem(index, 'company', value)}
                  />
                  <SectionEditor
                    label="Depoimento"
                    value={item.text}
                    onChange={(value) => updateTestimonialItem(index, 'text', value)}
                    multiline
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => removeTestimonialItem(index)} 
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
