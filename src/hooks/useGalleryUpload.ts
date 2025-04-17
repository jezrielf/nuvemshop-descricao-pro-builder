
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storageService';

export const useGalleryUpload = () => {
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const auth = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    
    // Iniciar o estado de upload para esta imagem
    setUploading(prev => ({ ...prev, [imageId]: true }));
    setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));
    
    try {
      // Função para atualizar o progresso específico para esta imagem
      const updateImageProgress = (progress: number) => {
        setUploadProgress(prev => ({ ...prev, [imageId]: progress }));
      };
      
      // Fazer o upload usando o serviço centralizado
      const result = await storageService.uploadFile({
        user: auth.user,
        file,
        path: 'gallery', // Colocar em uma subpasta "gallery" para organização
        onProgress: updateImageProgress
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso."
      });
      
      return {
        url: result.url!,
        alt: file.name.split('.')[0] || 'Imagem da galeria'
      };
    } catch (error: any) {
      console.error('Erro no upload da galeria:', error);
      
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar sua imagem",
        variant: "destructive",
      });
      
      return null;
    } finally {
      // Limpar estados
      setUploading(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      setUploadProgress(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      // Resetar input
      if (e.target) e.target.value = '';
    }
  };

  return {
    uploading,
    uploadProgress,
    handleFileChange
  };
};
