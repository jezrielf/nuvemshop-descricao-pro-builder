
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useUrlCodeExtractor() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const { toast } = useToast();

  const extractCodeFromUrl = (url: string) => {
    try {
      if (!url) return null;
      
      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');
      
      if (code) {
        toast({
          title: 'Código extraído',
          description: 'Código de autorização extraído com sucesso da URL.',
        });
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

  const extractCodeFromReferrer = () => {
    try {
      // Get the referrer URL if available
      const referrer = document.referrer;
      if (referrer && referrer.includes('descricaopro.com.br') && referrer.includes('code=')) {
        const url = new URL(referrer);
        const code = url.searchParams.get('code');
        if (code) {
          setRedirectUrl(referrer);
          toast({
            title: 'Código de autorização encontrado',
            description: 'Um código de autorização foi extraído da URL de referência.',
          });
          return code;
        }
      }
      return null;
    } catch (error) {
      console.error('Error extracting code from referrer:', error);
      return null;
    }
  };

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
    extractCodeFromUrl,
    extractCodeFromReferrer,
    copyToClipboard
  };
}
