import React, { useState } from 'react';
import LandingPageImageManager from './LandingPageImageManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  features: {
    title: string;
    items: { title: string; description: string }[];
  };
  about: {
    title: string;
    content: string;
  };
}

const LandingPagePanel: React.FC = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<LandingContent>({
    hero: {
      title: 'DescriçãoPRO',
      subtitle: 'Gere descrições profissionais para seus produtos',
      description: 'Uma ferramenta completa para criar descrições otimizadas e atraentes para seu e-commerce.'
    },
    features: {
      title: 'Recursos',
      items: [
        { title: 'Editor Visual', description: 'Interface intuitiva para criar descrições.' },
        { title: 'SEO Otimizado', description: 'Ferramentas para melhorar seu ranking.' },
        { title: 'Integração com Nuvemshop', description: 'Conecte-se facilmente com sua loja.' }
      ]
    },
    about: {
      title: 'Sobre Nós',
      content: 'Somos uma plataforma dedicada a ajudar lojistas a criar conteúdo de qualidade.'
    }
  });

  const handleContentChange = (section: keyof LandingContent, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
    setContent(prev => ({
      ...prev,
      features: {
        ...prev.features,
        items: prev.features.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement saving to backend
    toast({
      title: "Conteúdo salvo",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editor da Landing Page</h1>
      
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-8">
          {/* Seção Hero */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Seção Principal (Hero)</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input 
                  value={content.hero.title}
                  onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                  placeholder="Título principal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtítulo</label>
                <Input 
                  value={content.hero.subtitle}
                  onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                  placeholder="Subtítulo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea 
                  value={content.hero.description}
                  onChange={(e) => handleContentChange('hero', 'description', e.target.value)}
                  placeholder="Descrição principal"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Seção de Recursos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recursos</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Título da Seção</label>
              <Input 
                value={content.features.title}
                onChange={(e) => handleContentChange('features', 'title', e.target.value)}
                placeholder="Título dos recursos"
              />
            </div>
            <div className="space-y-4">
              {content.features.items.map((item, index) => (
                <div key={index} className="grid gap-3 p-4 border rounded-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título do Recurso {index + 1}</label>
                    <Input 
                      value={item.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      placeholder={`Título do recurso ${index + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição do Recurso</label>
                    <Textarea 
                      value={item.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      placeholder="Descrição do recurso"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção Sobre */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre Nós</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input 
                  value={content.about.title}
                  onChange={(e) => handleContentChange('about', 'title', e.target.value)}
                  placeholder="Título da seção sobre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Conteúdo</label>
                <Textarea 
                  value={content.about.content}
                  onChange={(e) => handleContentChange('about', 'content', e.target.value)}
                  placeholder="Conteúdo da seção sobre"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="images">
          <LandingPageImageManager />
        </TabsContent>

        <TabsContent value="style">
          <div className="text-muted-foreground">
            Seção de personalização de estilo em desenvolvimento...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPagePanel;
