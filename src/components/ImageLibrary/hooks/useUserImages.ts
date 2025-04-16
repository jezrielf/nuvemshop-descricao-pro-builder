
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
      console.log('Sem usuário autenticado para carregar imagens');
      return;
    }
    
    setLoading(true);
    
    try {
      // Verificar se bucket existe
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'user-images');
      
      if (!bucketExists) {
        // Usuário ainda não tem imagens
        setUserImages([]);
        setLoading(false);
        return;
      }
      
      const userId = auth.user.id;
      if (!userId) {
        console.warn("Sem ID de usuário disponível, não é possível carregar imagens");
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        if (error.message.includes("The resource was not found")) {
          // Normal para novos usuários sem uploads
          console.log("Usuário não tem uploads ainda");
          setUserImages([]);
          return;
        }
        throw error;
      }
      
      if (!data || data.length === 0) {
        setUserImages([]);
        return;
      }
      
      const imageUrls = await Promise.all(data.map(async (file) => {
        const { data: fileData } = supabase
          .storage
          .from('user-images')
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id,
          src: fileData.publicUrl,
          alt: file.name.split('.')[0] || 'Imagem enviada'
        };
      }));
      
      setUserImages(imageUrls);
    } catch (error) {
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

  // Carregar imagens do usuário quando a aba mudar ou o diálogo abrir
  useEffect(() => {
    if (isOpen && activeTab === 'uploads') {
      loadUserImages();
    }
  }, [isOpen, activeTab]);

  const addImageToList = (newImage: UserImage) => {
    setUserImages(prev => [newImage, ...prev]);
  };

  return {
    userImages,
    loading,
    loadUserImages,
    addImageToList
  };
};
