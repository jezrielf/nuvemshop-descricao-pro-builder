
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

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

interface LibraryTabProps {
  onSelectImage: (src: string, alt: string) => void;
  isPremium: boolean;
}

const LibraryTab: React.FC<LibraryTabProps> = ({ onSelectImage, isPremium }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Filtered images based on search term and category
  const filteredImages = mockImages.filter(image => {
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

  return (
    <div className="space-y-4">
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
                  !isPremium && index > 4 ? 'opacity-40' : ''
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
                    onClick={() => onSelectImage(image.src, image.alt)}
                    disabled={!isPremium && index > 4}
                  >
                    Selecionar
                  </Button>
                </div>
                {!isPremium && index === 4 && (
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
  );
};

export default LibraryTab;
