
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
      console.log('Usuário não autenticado, não é possível carregar imagens');
      return;
    }
    
    setLoading(true);
    
    try {
      const userId = auth.user.id;
      console.log('Carregando imagens para o usuário:', userId);
      
      // Verifica se o bucket existe, se não, não há imagens para mostrar
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Erro ao verificar buckets:', bucketsError);
        throw bucketsError;
      }
      
      const userImagesBucket = buckets?.find(bucket => bucket.name === 'user-images');
      if (!userImagesBucket) {
        console.log('Bucket de imagens não existe, criando...');
        // Tentar criar o bucket
        try {
          const { error: createError } = await supabase.storage.createBucket('user-images', {
            public: true,
            fileSizeLimit: 5242880 // 5MB
          });
          
          if (createError) {
            console.error('Erro ao criar bucket:', createError);
            toast({
              title: "Erro ao configurar armazenamento",
              description: "Não foi possível configurar o armazenamento de imagens.",
              variant: "destructive",
            });
          } else {
            console.log('Bucket user-images criado com sucesso');
          }
        } catch (err) {
          console.error('Exceção ao criar bucket:', err);
        }
        
        setUserImages([]);
        setLoading(false);
        return;
      }
      
      console.log('Bucket user-images encontrado, listando arquivos...');
      
      // Tenta listar os arquivos do usuário
      try {
        const { data: files, error: listError } = await supabase
          .storage
          .from('user-images')
          .list(userId, {
            sortBy: { column: 'created_at', order: 'desc' }
          });
        
        if (listError) {
          // Se o diretório não existir, é normal para novos usuários
          if (listError.message.includes('The specified key does not exist')) {
            console.log('Diretório do usuário não existe, nenhuma imagem ainda');
            setUserImages([]);
            setLoading(false);
            return;
          }
          
          console.error('Erro ao listar arquivos:', listError);
          throw listError;
        }
        
        if (!files || files.length === 0) {
          console.log('Nenhuma imagem encontrada para o usuário');
          setUserImages([]);
          setLoading(false);
          return;
        }
        
        console.log(`${files.length} imagens encontradas`);
        
        // Mapear os arquivos para o formato de UserImage
        const imageUrls = files.map(file => {
          const { data: urlData } = supabase
            .storage
            .from('user-images')
            .getPublicUrl(`${userId}/${file.name}`);
          
          return {
            id: file.id,
            src: urlData.publicUrl,
            alt: file.name.split('.')[0] || 'Imagem enviada'
          };
        });
        
        setUserImages(imageUrls);
      } catch (err) {
        console.error('Exceção ao listar arquivos:', err);
        toast({
          title: "Erro ao carregar imagens",
          description: "Não foi possível carregar suas imagens. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro geral ao carregar imagens:', error);
      toast({
        title: "Erro ao carregar imagens",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Carregar imagens quando o diálogo abrir na aba de uploads
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
