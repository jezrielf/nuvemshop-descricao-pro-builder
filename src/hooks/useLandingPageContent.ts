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

// Default landing page content as fallback
const defaultLandingContent: Record<string, any> = {
  hero: {
    title: 'Crie Descrições que Vendem',
    subtitle: 'Use Inteligência Artificial para gerar descrições profissionais e otimizadas para SEO em minutos.',
    cta_primary: 'Começar Gratuitamente',
    cta_secondary: 'Ver Demonstração'
  },
  features: {
    title: 'Recursos Poderosos',
    description: 'Tudo que você precisa para criar descrições que convertem',
    items: [
      {
        title: 'IA Especializada em E-commerce',
        description: 'Nossa IA foi treinada com milhares de descrições de sucesso para gerar textos que realmente vendem.',
        icon: 'Sparkles'
      },
      {
        title: 'Otimização SEO em Tempo Real',
        description: 'Análise instantânea de SEO para garantir que suas descrições apareçam no topo das buscas.',
        icon: 'BarChart2'
      },
      {
        title: 'Templates Profissionais',
        description: 'Biblioteca completa de templates testados e aprovados para diferentes segmentos.',
        icon: 'Layout'
      }
    ]
  },
  how_it_works: {
    title: 'Como Funciona',
    description: 'Processo simples e intuitivo para criar descrições de produto',
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

export const useLandingPageContent = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [useLocalData, setUseLocalData] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from database
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('*');

      if (error) {
        // Check if it's the infinite recursion error
        if (error.code === '42P17' && error.message.includes('infinite recursion')) {
          console.warn("Using local fallback due to RLS policy recursion error:", error);
          setUseLocalData(true);
          setContent(defaultLandingContent);
        } else {
          throw error;
        }
      } else {
        // Transform array of sections into an object
        const contentMap = (data || []).reduce((acc, item) => ({
          ...acc,
          [item.section]: item.content
        }), {});

        setContent(contentMap);
        console.log("Loaded landing page content:", contentMap);
      }
    } catch (error: any) {
      console.error("Error loading landing page content:", error);
      
      // Fall back to local data
      setUseLocalData(true);
      setContent(defaultLandingContent);
      
      toast({
        title: "Erro ao carregar conteúdo",
        description: "Usando dados locais como fallback. " + error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (section: string, newContent: any) => {
    try {
      console.log(`Updating section ${section} with:`, newContent);
      
      // If we're using local data due to database error, just update the local state
      if (useLocalData) {
        setContent(prev => ({
          ...prev,
          [section]: newContent
        }));
        
        toast({
          title: "Seção atualizada localmente",
          description: "As alterações foram salvas na memória (modo fallback)."
        });
        
        return true;
      }
      
      // Otherwise, try to update in the database
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
      
      // If it's the recursion error, switch to local mode for future operations
      if (error.code === '42P17' && error.message.includes('infinite recursion')) {
        setUseLocalData(true);
        
        // Still update the local content
        setContent(prev => ({
          ...prev,
          [section]: newContent
        }));
        
        toast({
          title: "Erro no banco de dados",
          description: "Modo local ativado. As alterações serão salvas apenas na memória.",
          variant: "destructive"
        });
        
        return true;
      }
      
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
    updateSection,
    refreshContent: fetchContent,
    isLocalMode: useLocalData
  };
};
