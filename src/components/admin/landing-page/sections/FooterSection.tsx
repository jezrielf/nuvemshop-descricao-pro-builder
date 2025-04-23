
import React from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface FooterContent {
  main_text: string;
  company_name: string;
  copyright: string;
}

interface FooterSectionProps {
  content: FooterContent;
  onChange: (content: FooterContent) => void;
  onSave: () => void;
  saving?: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  content, 
  onChange, 
  onSave,
  saving = false 
}) => {
  const updateField = (field: keyof FooterContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Rodapé</CardTitle>
        <Button 
          onClick={onSave} 
          disabled={saving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <SectionEditor
          label="Texto Principal"
          value={content.main_text}
          onChange={(value) => updateField('main_text', value)}
          multiline
        />
        <SectionEditor
          label="Nome da Empresa"
          value={content.company_name}
          onChange={(value) => updateField('company_name', value)}
        />
        <SectionEditor
          label="Texto de Copyright"
          value={content.copyright}
          onChange={(value) => updateField('copyright', value)}
        />
      </CardContent>
    </Card>
  );
};
