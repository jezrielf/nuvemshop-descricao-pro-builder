import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LandingPageImageManager from './LandingPageImageManager';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Info, Database } from 'lucide-react';
import { useLandingPageContent } from '@/hooks/useLandingPageContent';

// Import section components
import { HeroSection } from './landing-page/sections/HeroSection';
import { FeaturesSection } from './landing-page/sections/FeaturesSection';
import { ExclusiveFeaturesSection } from './landing-page/sections/ExclusiveFeaturesSection';
import { HowItWorksSection } from './landing-page/sections/HowItWorksSection';
import { BenefitsSection } from './landing-page/sections/BenefitsSection';
import { TestimonialsSection } from './landing-page/sections/TestimonialsSection';
import { CTASection } from './landing-page/sections/CTASection';
import { FooterSection } from './landing-page/sections/FooterSection';

const defaultContent = {
  hero: {
    title: 'Título Principal',
    subtitle: 'Subtítulo da página',
    cta_primary: 'Botão Principal',
    cta_secondary: 'Botão Secundário'
  },
  features: {
    title: 'Recursos da Plataforma',
    description: 'Descrição dos recursos',
    items: []
  },
  exclusive_features: {
    title: 'Recursos Exclusivos',
    items: []
  },
  how_it_works: {
    title: 'Como Funciona',
    description: 'Descrição de como funciona',
    steps: []
  },
  benefits: {
    title: 'Por que usar nosso produto?',
    items: []
  },
  testimonials: {
    title: 'O que nossos clientes dizem',
    items: []
  },
  cta: {
    title: 'Pronto para começar?',
    description: 'Descrição para o call-to-action',
    cta_primary: 'Começar agora',
    cta_secondary: 'Saiba mais'
  },
  footer: {
    main_text: 'Descrição da empresa',
    company_name: 'Nome da Empresa',
    copyright: 'Todos os direitos reservados'
  }
};

const LandingPagePanel: React.FC = () => {
  const { content, loading, updateSection, isLocalMode } = useLandingPageContent();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [savingSections, setSavingSections] = useState<Record<string, boolean>>({});

  // Function to get content for a section with fallback to default
  const getSectionContent = (section: string) => {
    if (!content || !content[section]) {
      return defaultContent[section as keyof typeof defaultContent] || {};
    }
    return content[section];
  };

  // Update local section content
  const [localContent, setLocalContent] = useState<Record<string, any>>({});
  
  // Initialize local content when content loads from database
  React.useEffect(() => {
    if (!loading && content) {
      setLocalContent(content);
    }
  }, [content, loading]);

  // Update local content for a section
  const updateLocalContent = (section: string, newContent: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: newContent
    }));
  };

  // Save a section
  const saveSection = async (section: string) => {
    setSavingSections(prev => ({ ...prev, [section]: true }));
    
    try {
      await updateSection(section, localContent[section]);
    } finally {
      setSavingSections(prev => ({ ...prev, [section]: false }));
    }
  };

  // Handle accordion state
  const handleAccordionChange = (value: string) => {
    setActiveSection(value === activeSection ? null : value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Carregando conteúdo da página...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Editor da Landing Page</h1>
        <p className="text-muted-foreground">
          Personalize o conteúdo da sua página inicial aqui.
        </p>
      </div>

      {isLocalMode && (
        <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
          <Database className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Modo Local Ativo</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Devido a um erro no banco de dados, estamos operando em modo local.
            As alterações serão salvas apenas na memória e serão perdidas ao recarregar a página.
            Entre em contato com o suporte para resolver o problema de permissões na tabela "user_roles".
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Dica</AlertTitle>
        <AlertDescription>
          Todas as alterações feitas aqui serão exibidas na página inicial do seu site.
          Lembre-se de salvar cada seção após fazer as alterações.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Accordion 
            type="single" 
            collapsible 
            value={activeSection || undefined}
            onValueChange={handleAccordionChange}
          >
            <AccordionItem value="hero">
              <AccordionTrigger>Seção Hero (Principal)</AccordionTrigger>
              <AccordionContent>
                <HeroSection 
                  content={getSectionContent('hero')}
                  onChange={(newContent) => updateLocalContent('hero', newContent)}
                  onSave={() => saveSection('hero')}
                  saving={savingSections['hero']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger>Seção de Recursos</AccordionTrigger>
              <AccordionContent>
                <FeaturesSection 
                  content={getSectionContent('features')}
                  onChange={(newContent) => updateLocalContent('features', newContent)}
                  onSave={() => saveSection('features')}
                  saving={savingSections['features']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="exclusive_features">
              <AccordionTrigger>Recursos Exclusivos</AccordionTrigger>
              <AccordionContent>
                <ExclusiveFeaturesSection 
                  content={getSectionContent('exclusive_features')}
                  onChange={(newContent) => updateLocalContent('exclusive_features', newContent)}
                  onSave={() => saveSection('exclusive_features')}
                  saving={savingSections['exclusive_features']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how_it_works">
              <AccordionTrigger>Como Funciona</AccordionTrigger>
              <AccordionContent>
                <HowItWorksSection 
                  content={getSectionContent('how_it_works')}
                  onChange={(newContent) => updateLocalContent('how_it_works', newContent)}
                  onSave={() => saveSection('how_it_works')}
                  saving={savingSections['how_it_works']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="benefits">
              <AccordionTrigger>Benefícios</AccordionTrigger>
              <AccordionContent>
                <BenefitsSection 
                  content={getSectionContent('benefits')}
                  onChange={(newContent) => updateLocalContent('benefits', newContent)}
                  onSave={() => saveSection('benefits')}
                  saving={savingSections['benefits']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testimonials">
              <AccordionTrigger>Depoimentos</AccordionTrigger>
              <AccordionContent>
                <TestimonialsSection 
                  content={getSectionContent('testimonials')}
                  onChange={(newContent) => updateLocalContent('testimonials', newContent)}
                  onSave={() => saveSection('testimonials')}
                  saving={savingSections['testimonials']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cta">
              <AccordionTrigger>CTA (Call to Action)</AccordionTrigger>
              <AccordionContent>
                <CTASection 
                  content={getSectionContent('cta')}
                  onChange={(newContent) => updateLocalContent('cta', newContent)}
                  onSave={() => saveSection('cta')}
                  saving={savingSections['cta']}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="footer">
              <AccordionTrigger>Rodapé</AccordionTrigger>
              <AccordionContent>
                <FooterSection 
                  content={getSectionContent('footer')}
                  onChange={(newContent) => updateLocalContent('footer', newContent)}
                  onSave={() => saveSection('footer')}
                  saving={savingSections['footer']}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="images">
          <LandingPageImageManager />
        </TabsContent>

        <TabsContent value="style">
          <div className="p-4 border rounded-md text-center text-muted-foreground">
            <p>Seção de personalização de estilo em desenvolvimento...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPagePanel;
