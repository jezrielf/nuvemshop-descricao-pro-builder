
import React from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface CTAContent {
  title: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

interface CTASectionProps {
  content: CTAContent;
  onChange: (content: CTAContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({ 
  content, 
  onChange, 
  onSave,
  saving = false 
}) => {
  const updateField = (field: keyof CTAContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Seção CTA (Call to Action)</CardTitle>
        <Button 
          onClick={onSave} 
          disabled={saving}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500 mb-4">
          Esta seção incentiva os usuários a realizar uma ação importante, como se cadastrar ou conhecer mais sobre os planos.
        </p>
        
        <SectionEditor
          label="Título"
          value={content.title}
          onChange={(value) => updateField('title', value)}
        />
        <SectionEditor
          label="Descrição"
          value={content.description}
          onChange={(value) => updateField('description', value)}
          multiline
        />
        <SectionEditor
          label="Texto do Botão Principal"
          value={content.cta_primary}
          onChange={(value) => updateField('cta_primary', value)}
        />
        <SectionEditor
          label="Texto do Botão Secundário"
          value={content.cta_secondary}
          onChange={(value) => updateField('cta_secondary', value)}
        />
      </CardContent>
    </Card>
  );
};
