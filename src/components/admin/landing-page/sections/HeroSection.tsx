
import React from 'react';
import { SectionEditor } from '../components/SectionEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroContent {
  title: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

interface HeroSectionProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, onChange }) => {
  const updateField = (field: keyof HeroContent, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seção Hero</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
