import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { storageService } from '@/services/storage';

interface UserImage {
  id: string;
  src: string;
  alt: string;
}

export const useUserImages = (isOpen: boolean, activeTab: string) => {
  const [userImages, setUserImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  const loadUserImages = async () => {
    if (!auth.user) {
      return;
    }
    
    setLoading(true);
    
    try {
      const images = await storageService.listUserImages(auth.user.id);
      setUserImages(images);
    } catch (error: any) {
      console.error('Erro ao carregar imagens:', error);
      toast({
        title: "Erro ao carregar imagens",
        description: "Não foi possível carregar suas imagens. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Carregar imagens quando o diálogo abrir na aba de uploads
  useEffect(() => {
    if (isOpen && activeTab === 'uploads' && auth.user) {
      loadUserImages();
    }
  }, [isOpen, activeTab, auth.user]);

  const addImageToList = (newImage: UserImage) => {
    setUserImages(prev => [newImage, ...prev]);
  };

  const deleteImage = async (imageUrl: string) => {
    if (!auth.user) return false;
    
    try {
      const success = await storageService.deleteImage(auth.user.id, imageUrl);
      
      if (success) {
        setUserImages(prev => prev.filter(img => img.src !== imageUrl));
        toast({
          title: "Imagem excluída",
          description: "A imagem foi removida com sucesso."
        });
        return true;
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir a imagem. Tente novamente.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir a imagem.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    userImages,
    loading,
    loadUserImages,
    addImageToList,
    deleteImage
  };
};
