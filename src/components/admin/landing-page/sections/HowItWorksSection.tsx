
import React, { useState } from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { Save, Plus, Trash2 } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';

interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
}

interface HowItWorksContent {
  title: string;
  description: string;
  steps: Step[];
}

interface HowItWorksSectionProps {
  content: HowItWorksContent;
  onChange: (content: HowItWorksContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ 
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

  const updateStep = (index: number, field: keyof Step, value: any) => {
    const updatedSteps = [...content.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    onChange({ ...content, steps: updatedSteps });
  };

  const addStep = () => {
    const newNumber = content.steps.length > 0 
      ? Math.max(...content.steps.map(step => step.number)) + 1
      : 1;
    
    const newStep = {
      number: newNumber,
      title: `Passo ${newNumber}`,
      description: 'Descrição do passo',
      image: '/placeholder.svg'
    };
    
    onChange({ ...content, steps: [...content.steps, newStep] });
    toast({
      title: "Passo adicionado",
      description: `Passo ${newNumber} foi adicionado. Personalize-o conforme necessário.`
    });
  };

  const removeStep = (index: number) => {
    const updatedSteps = content.steps.filter((_, i) => i !== index);
    onChange({ ...content, steps: updatedSteps });
    toast({
      title: "Passo removido",
      description: "O passo foi removido com sucesso."
    });
  };

  const handleImageSelect = (imageUrl: string) => {
    if (activeImageIndex !== null) {
      updateStep(activeImageIndex, 'image', imageUrl);
      setActiveImageIndex(null);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Como Funciona</CardTitle>
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
            <h3 className="text-lg font-medium">Passos</h3>
            <Button 
              onClick={addStep} 
              variant="outline" 
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar Passo
            </Button>
          </div>
          
          {content.steps.map((step, index) => (
            <Card key={index} className="p-4">
              <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                <div className="space-y-2">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input 
                      type="number"
                      className="w-full p-2 border rounded"
                      value={step.number}
                      onChange={(e) => updateStep(index, 'number', parseInt(e.target.value))}
                      min="1"
                    />
                  </div>
                  <ImageUploadPreview 
                    src={step.image}
                    alt={step.title}
                    onEdit={() => setActiveImageIndex(index)}
                    onRemove={() => updateStep(index, 'image', '/placeholder.svg')}
                  />
                </div>
                <div className="space-y-4">
                  <SectionEditor
                    label="Título"
                    value={step.title}
                    onChange={(value) => updateStep(index, 'title', value)}
                  />
                  <SectionEditor
                    label="Descrição"
                    value={step.description}
                    onChange={(value) => updateStep(index, 'description', value)}
                    multiline
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => removeStep(index)} 
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
