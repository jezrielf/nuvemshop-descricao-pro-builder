
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
      console.log('Usuário não autenticado');
      return;
    }
    
    setLoading(true);
    
    try {
      const userId = auth.user.id;
      
      const { data, error } = await supabase.storage
        .from('user-images')
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        console.error('Erro ao listar imagens:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('Nenhuma imagem encontrada');
        setUserImages([]);
        return;
      }
      
      const imageUrls = await Promise.all(data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('user-images')
          .getPublicUrl(`${userId}/${file.name}`);
        
        return {
          id: file.id,
          src: urlData.publicUrl,
          alt: file.name.split('.')[0] || 'Imagem enviada'
        };
      }));
      
      setUserImages(imageUrls);
    } catch (error: any) {
      console.error('Erro ao carregar imagens:', error);
      
      toast({
        title: "Erro ao carregar imagens",
        description: error.message || "Não foi possível carregar suas imagens.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'uploads') {
      loadUserImages();
    }
  }, [isOpen, activeTab, auth.user]);

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
