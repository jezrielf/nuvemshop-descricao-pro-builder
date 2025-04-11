
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image as ImageIcon, Search, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  
  const filteredImages = images.filter(image => {
    const matchesSearch = image.alt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || image.category === category;
    return matchesSearch && matchesCategory;
  });
  
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
            Escolha uma imagem da nossa biblioteca para usar em sua descrição.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full py-4">
          <div className="flex gap-2 mb-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLibrary;
