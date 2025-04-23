
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
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('landing_page_content')
        .select('*');

      if (error) throw error;

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
    } finally {
      setLoading(false);
    }
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
    updateSection,
    refreshContent: fetchContent
  };
};
