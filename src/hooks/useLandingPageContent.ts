
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type LandingPageSection = 
  | 'hero' 
  | 'features' 
  | 'exclusive_features' 
  | 'how_it_works' 
  | 'benefits' 
  | 'testimonials' 
  | 'cta'
  | 'footer';

export const useLandingPageContent = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching landing page content from Supabase...");
      
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('*');

      if (error) {
        console.error("Error fetching landing page content:", error);
        setError(error.message);
        throw error;
      }

      // Transform array of sections into an object
      const contentMap = (data || []).reduce((acc, item) => ({
        ...acc,
        [item.section]: item.content
      }), {});

      setContent(contentMap);
      console.log("Loaded landing page content:", contentMap);
    } catch (error: any) {
      console.error("Error loading landing page content:", error);
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message,
        variant: "destructive"
      });
      
      // Provide default content when there's an error
      const defaultContent = getDefaultContent();
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  // Provide default content for when Supabase fails
  const getDefaultContent = () => {
    return {
      hero: {
        title: 'Otimize suas descrições de produtos com IA',
        subtitle: 'Crie descrições envolventes e otimizadas para SEO em segundos.',
        cta_primary: 'Começar agora',
        cta_secondary: 'Saiba mais'
      },
      features: {
        title: 'Recursos da Plataforma',
        description: 'Nossas ferramentas para seu sucesso',
        items: [
          {
            title: 'Gere descrições rapidamente',
            description: 'Use a IA para criar descrições de alta qualidade em segundos.',
            image: '/placeholder.svg'
          },
          {
            title: 'Otimize para SEO',
            description: 'Melhore o ranking dos seus produtos nos motores de busca.',
            image: '/placeholder.svg'
          },
          {
            title: 'Converta mais clientes',
            description: 'Descrições persuasivas que destacam os benefícios do seu produto.',
            image: '/placeholder.svg'
          }
        ]
      },
      cta: {
        title: 'Pronto para começar?',
        description: 'Comece a criar descrições incríveis para seus produtos hoje mesmo.',
        cta_primary: 'Começar agora',
        cta_secondary: 'Conhecer planos'
      }
    };
  };

  const updateSection = async (section: string, newContent: any) => {
    try {
      console.log(`Updating section ${section} with:`, newContent);
      
      const { error } = await supabase
        .from('landing_page_content')
        .update({ content: newContent })
        .eq('section', section);

      if (error) throw error;

      setContent(prev => ({
        ...prev,
        [section]: newContent
      }));

      toast({
        title: "Seção atualizada",
        description: "As alterações foram salvas com sucesso."
      });
      
      return true;
    } catch (error: any) {
      console.error("Error updating section:", error);
      
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive"
      });
      
      return false;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    error,
    updateSection,
    refreshContent: fetchContent
  };
};
