
import React from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface HeroContent {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

interface HeroSectionProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  content, 
  onChange, 
  onSave,
  saving = false 
}) => {
  const updateField = (field: keyof HeroContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Seção Hero (Principal)</CardTitle>
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
          Esta é a primeira seção que os visitantes verão ao acessar sua página.
          Personalize o texto para atrair a atenção dos usuários.
        </p>

        <SectionEditor
          label="Título Principal"
          value={content.title}
          onChange={(value) => updateField('title', value)}
        />
        <SectionEditor
          label="Subtítulo"
          value={content.subtitle}
          onChange={(value) => updateField('subtitle', value)}
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
