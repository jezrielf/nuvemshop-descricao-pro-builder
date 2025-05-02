
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GooglebotAnalysisResult {
  status: number;
  headers: Record<string, string>;
  html: string;
  analysis: {
    title: { exists: boolean; content: string | null; length: number };
    metaDescription: { exists: boolean; content: string | null; length: number };
    h1: { exists: boolean; content: string | null };
    robots: { meta: string | null; header: string | null };
    canonical: string | null;
    hreflangs: Array<{ lang: string | null; url: string | null }>;
    mobile: { hasViewport: boolean; viewport: string | null };
    structuredData: { count: number; items: any[] };
    images: { count: number; withoutAlt: number };
    links: { count: number; externalCount: number };
    performance: { htmlSize: number; estimatedLoadTime: number };
    keywords: Array<{ keyword: string; count: number; density: number }>;
  };
}

export const useGooglebotAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<GooglebotAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeUrl = async (url: string) => {
    if (!url) {
      setError('URL é obrigatória');
      toast({
        title: "Erro na análise",
        description: "URL é obrigatória para análise",
        variant: "destructive"
      });
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('googlebot-analyzer', {
        body: { url },
      });

      if (error) {
        console.error('Error analyzing URL with Googlebot:', error);
        setError('Falha ao analisar URL: ' + error.message);
        toast({
          title: "Erro na análise do Googlebot",
          description: "Não foi possível analisar a URL como Googlebot",
          variant: "destructive"
        });
        return null;
      }

      setResult(data as GooglebotAnalysisResult);
      toast({
        title: "Análise concluída",
        description: "A análise do Googlebot foi concluída com sucesso",
      });
      return data;
    } catch (err) {
      console.error('Exception analyzing URL with Googlebot:', err);
      setError('Erro ao processar análise: ' + (err instanceof Error ? err.message : String(err)));
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro ao analisar a URL",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeUrl,
    isAnalyzing,
    result,
    error
  };
};
