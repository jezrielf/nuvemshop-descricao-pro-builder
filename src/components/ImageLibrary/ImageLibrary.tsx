
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image as ImageIcon, Search, Loader2, Upload, Plus, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

// Mock data for image library
const mockImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', alt: 'Headphones', category: 'electronics' },
  { id: 2, src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', alt: 'Red Shoes', category: 'shoes' },
  { id: 3, src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', alt: 'Watch', category: 'accessories' },
  { id: 4, src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86', alt: 'Colorful Shirts', category: 'clothing' },
  { id: 5, src: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd', alt: 'Protein Powder', category: 'supplements' },
  { id: 6, src: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411', alt: 'Energy Drink', category: 'energy' },
  { id: 7, src: 'https://images.unsplash.com/photo-1600086827875-a63b09513f4b', alt: 'Running Shoes', category: 'shoes' },
  { id: 8, src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f', alt: 'Sunglasses', category: 'accessories' },
  { id: 9, src: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12', alt: 'Smart Watch', category: 'electronics' },
  { id: 10, src: 'https://images.unsplash.com/photo-1593419528756-3cdea84fdba7', alt: 'Supplement Bottle', category: 'supplements' },
  { id: 11, src: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2', alt: 'Energy Gel', category: 'energy' },
  { id: 12, src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f', alt: 'T-Shirt', category: 'clothing' },
];

interface ImageLibraryProps {
  onSelectImage: (imageUrl: string, alt: string) => void;
  trigger?: React.ReactNode;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ onSelectImage, trigger }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [images, setImages] = useState(mockImages);
  const [userImages, setUserImages] = useState<{id: string, src: string, alt: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('library');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const auth = useAuth();
  
  // Filtered images based on search term and category
  const filteredImages = images.filter(image => {
    const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || image.category === category;
    return matchesSearch && matchesCategory;
  });
  
  // Load user's uploaded images
  useEffect(() => {
    if (open && activeTab === 'uploads') {
      loadUserImages();
    }
  }, [open, activeTab]);

  const loadUserImages = async () => {
    if (!auth.user) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .storage
        .from('user-images')
        .list(auth.user.id, {
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const imageUrls = await Promise.all(data.map(async (file) => {
          const { data: fileUrl } = supabase
            .storage
            .from('user-images')
            .getPublicUrl(`${auth.user!.id}/${file.name}`);
          
          return {
            id: file.id,
            src: fileUrl.publicUrl,
            alt: file.name.split('.')[0] || 'Uploaded image'
          };
        }));
        
        setUserImages(imageUrls);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: "Erro ao carregar imagens",
        description: "Não foi possível carregar suas imagens. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  const handleSelectImage = (src: string, alt: string) => {
    onSelectImage(src, alt);
    setOpen(false);
    
    toast({
      title: "Imagem selecionada",
      description: "A imagem foi adicionada ao seu bloco.",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    setImageAlt(file.name.split('.')[0] || '');
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async () => {
    if (!imageFile || !auth.user) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Create a unique file name to avoid conflicts
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${imageAlt || 'image'}.${fileExt}`;
      const filePath = `${auth.user.id}/${fileName}`;
      
      // Upload the file with progress tracking
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(Math.round(percent));
          },
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      // Reset the form
      setImageFile(null);
      setPreviewUrl(null);
      setImageAlt('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Add to user images and select it
      const newImage = { 
        id: Date.now().toString(), 
        src: fileUrl.publicUrl, 
        alt: imageAlt 
      };
      
      setUserImages(prev => [newImage, ...prev]);
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
      
      // Auto-select the uploaded image
      handleSelectImage(fileUrl.publicUrl, imageAlt);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar sua imagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };
  
  const cancelUpload = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setImageAlt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Check for premium features
  const isPremiumFeature = !auth.isPremium() && images.length > 5;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center">
            <ImageIcon className="h-4 w-4 mr-1" />
            Biblioteca de Imagens
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Biblioteca de Imagens</DialogTitle>
          <DialogDescription>
            Escolha uma imagem da nossa biblioteca para usar em sua descrição ou faça upload de uma nova.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full py-4">
          <Tabs 
            defaultValue="library" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="library">Biblioteca</TabsTrigger>
              <TabsTrigger value="uploads">Minhas Imagens</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="library" className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Buscar imagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
                </Button>
              </div>
              
              <Tabs defaultValue="all" onValueChange={setCategory} className="flex-1 flex flex-col">
                <TabsList className="mb-4 flex flex-wrap">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="electronics">Eletrônicos</TabsTrigger>
                  <TabsTrigger value="clothing">Roupas</TabsTrigger>
                  <TabsTrigger value="shoes">Calçados</TabsTrigger>
                  <TabsTrigger value="accessories">Acessórios</TabsTrigger>
                  <TabsTrigger value="supplements">Suplementos</TabsTrigger>
                  <TabsTrigger value="energy">Energéticos</TabsTrigger>
                </TabsList>
                
                <ScrollArea className="flex-1 h-96">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredImages.map((image, index) => (
                      <div 
                        key={image.id} 
                        className={`relative group overflow-hidden rounded-md border ${
                          isPremiumFeature && index > 4 ? 'opacity-40' : ''
                        }`}
                      >
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleSelectImage(image.src, image.alt)}
                            disabled={isPremiumFeature && index > 4}
                          >
                            Selecionar
                          </Button>
                        </div>
                        {isPremiumFeature && index === 4 && (
                          <div className="absolute inset-0 flex items-center justify-center mt-32">
                            <Button variant="outline" onClick={() => toast({
                              title: "Recurso Premium",
                              description: "Faça upgrade para acessar mais imagens.",
                            })}>
                              Desbloquear Mais
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="uploads" className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-80">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : userImages.length > 0 ? (
                <ScrollArea className="h-96">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {userImages.map((image) => (
                      <div 
                        key={image.id} 
                        className="relative group overflow-hidden rounded-md border"
                      >
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleSelectImage(image.src, image.alt)}
                          >
                            Selecionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma imagem encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Você ainda não enviou nenhuma imagem. Use a aba "Upload" para adicionar suas próprias imagens.
                  </p>
                  <Button onClick={() => setActiveTab('upload')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative mx-auto max-w-xs">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-h-64 mx-auto"
                      />
                      <Button
                        variant="ghost" 
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
                        onClick={cancelUpload}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Texto alternativo (alt)</label>
                      <Input
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        placeholder="Descreva a imagem para acessibilidade"
                      />
                    </div>
                    
                    {uploading ? (
                      <div className="space-y-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground">Enviando... {uploadProgress}%</p>
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={uploadImage}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar Imagem
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium mb-1">Clique para selecionar uma imagem</p>
                        <p className="text-sm text-muted-foreground mb-4">ou arraste e solte aqui</p>
                        <p className="text-xs text-muted-foreground">Tamanho máximo: 5MB | JPG, PNG, GIF</p>
                      </div>
                    </label>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLibrary;
