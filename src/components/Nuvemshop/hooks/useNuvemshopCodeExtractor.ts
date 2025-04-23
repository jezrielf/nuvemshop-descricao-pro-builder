
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseNuvemshopCodeExtractorProps {
  setTestCode: (code: string) => void;
  handleTestCode: () => void;
}

export function useNuvemshopCodeExtractor({ setTestCode, handleTestCode }: UseNuvemshopCodeExtractorProps) {
  const [redirectUrl, setRedirectUrl] = useState('');
  const { toast } = useToast();

  const extractAndTestCode = (url: string) => {
    try {
      if (!url) return null;
      
      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');
      
      if (code) {
        setTestCode(code);
        // Automatically test the code after extraction
        setTimeout(() => handleTestCode(), 100);
        return code;
      } else {
        toast({
          variant: 'destructive',
          title: 'Código não encontrado',
          description: 'Não foi possível encontrar um código de autorização na URL fornecida.',
        });
        return null;
      }
    } catch (error) {
      console.error('Error parsing URL:', error);
      toast({
        variant: 'destructive',
        title: 'URL inválida',
        description: 'O formato da URL fornecida é inválido.',
      });
      return null;
    }
  };

  // Extract from current URL on mount
  useEffect(() => {
    // Check current URL first
    const currentUrl = window.location.href;
    if (currentUrl.includes('code=')) {
      console.log("Encontrado código na URL atual:", currentUrl);
      extractAndTestCode(currentUrl);
    } 
    // Check referrer second
    else {
      const referrer = document.referrer;
      if (referrer && referrer.includes('code=')) {
        console.log("Encontrado código no referrer:", referrer);
        setRedirectUrl(referrer);
        extractAndTestCode(referrer);
      }
    }
  }, []);

  // Watch for changes in redirectUrl and automatically extract and test code
  useEffect(() => {
    if (redirectUrl) {
      extractAndTestCode(redirectUrl);
    }
  }, [redirectUrl]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: 'Copiado!',
          description: 'Texto copiado para a área de transferência.',
        });
      })
      .catch((err) => {
        console.error('Erro ao copiar:', err);
        toast({
          variant: 'destructive',
          title: 'Erro ao copiar',
          description: 'Não foi possível copiar o texto.',
        });
      });
  };

  return {
    redirectUrl,
    setRedirectUrl,
    extractAndTestCode,
    copyToClipboard
  };
}
