
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Upload } from 'lucide-react';

interface LandingPageImage {
  name: string;
  url: string;
}

const LandingPageImageManager: React.FC = () => {
  const [images, setImages] = useState<LandingPageImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Fetch existing landing page images
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('landing-page')
        .list();

      if (error) throw error;

      const imageUrls = data.map(file => ({
        name: file.name,
        url: supabase.storage.from('landing-page').getPublicUrl(file.name).data.publicUrl
      }));

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: 'Erro ao carregar imagens',
        description: 'Não foi possível carregar as imagens da página inicial.',
        variant: 'destructive'
      });
    }
  };

  // Upload a new image
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `landing-page-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('landing-page')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('landing-page').getPublicUrl(fileName);

      setImages(prev => [...prev, { 
        name: fileName, 
        url: data.publicUrl 
      }]);

      toast({
        title: 'Upload concluído',
        description: 'Imagem adicionada com sucesso.',
      });

      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Erro no upload',
        description: 'Não foi possível fazer upload da imagem.',
        variant: 'destructive'
      });
    }
  };

  // Delete an image
  const handleDeleteImage = async (imageName: string) => {
    try {
      const { error } = await supabase.storage
        .from('landing-page')
        .remove([imageName]);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.name !== imageName));

      toast({
        title: 'Imagem removida',
        description: 'A imagem foi removida com sucesso.',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Erro ao remover imagem',
        description: 'Não foi possível remover a imagem.',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Gerenciamento de Imagens da Página Inicial</h2>
      
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="flex-grow"
        />
        <Button 
          onClick={handleFileUpload}
          disabled={!selectedFile}
          variant="secondary"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.name} className="relative">
            <img 
              src={image.url} 
              alt="Imagem da página inicial" 
              className="w-full h-48 object-cover rounded-md"
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2"
              onClick={() => handleDeleteImage(image.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageImageManager;
