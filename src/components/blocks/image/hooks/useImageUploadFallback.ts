
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseImageUploadFallbackProps {
  onSuccess?: (url: string, alt: string) => void;
}

export const useImageUploadFallback = ({ onSuccess }: UseImageUploadFallbackProps = {}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const simulateUpload = async (file: File): Promise<{ url: string, alt: string } | null> => {
    if (!file) return null;
    
    // Validar o arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem (JPG, PNG, GIF, etc)",
        variant: "destructive",
      });
      return null;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB",
        variant: "destructive",
      });
      return null;
    }
    
    // Iniciar simulação de upload
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Converter o arquivo para URL Base64 (solução alternativa ao upload real)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        // Configurar atualização de progresso
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = Math.min(prev + 10, 90);
            return newProgress;
          });
        }, 200);
        
        reader.onload = () => {
          clearInterval(progressInterval);
          setUploadProgress(100);
          
          const result = reader.result as string;
          
          // Extrair nome do arquivo para texto alternativo
          const alt = file.name.split('.').shift() || 'Imagem';
          
          setTimeout(() => {
            if (onSuccess) {
              onSuccess(result, alt);
            }
            resolve({ url: result, alt });
          }, 500);
        };
        
        reader.onerror = (error) => {
          clearInterval(progressInterval);
          reject(error);
        };
        
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      toast({
        title: "Erro ao processar imagem",
        description: "Não foi possível processar a imagem selecionada. Tente novamente.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    return simulateUpload(file);
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange,
    simulateUpload
  };
};
