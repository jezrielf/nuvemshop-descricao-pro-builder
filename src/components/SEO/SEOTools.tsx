
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Settings, ChevronDown, Search, Tag, Image, List, BarChart, Lightbulb } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import SEOAnalyzer from './SEOAnalyzer';
import MetaTagValidator from './MetaTagValidator';
import ImageOptimizer from './ImageOptimizer';
import SEOChecklist from './SEOChecklist';
import AIContentRecommender from '../AIGenerator/AIContentRecommender';
import { useEditorStore } from '@/store/editor';

interface SEOToolsProps {
  description: ProductDescription | null;
}

const SEOTools: React.FC<SEOToolsProps> = ({ description }) => {
  const { updateBlock } = useEditorStore();
  
  // Handler for updating image in a block
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    if (!blockId || !description) return;
    
    const block = description.blocks.find(b => b.id === blockId);
    if (!block) return;
    
    // Handle different image types based on the block type
    if (imageType === 'src' && block.type === 'image') {
      updateBlock(blockId, { src: newImageUrl });
    } 
    else if (imageType === 'image' && 
             (block.type === 'hero' || block.type === 'imageText' || block.type === 'textImage')) {
      if (block.image) {
        updateBlock(blockId, { 
          image: { ...block.image, src: newImageUrl }
        });
      }
    }
    else if (imageType.startsWith('gallery-') && block.type === 'gallery' && block.images) {
      const index = parseInt(imageType.split('-')[1]);
      if (isNaN(index) || index < 0 || index >= block.images.length) return;
      
      const newImages = [...block.images];
      newImages[index] = { ...newImages[index], src: newImageUrl };
      
      updateBlock(blockId, { images: newImages });
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Settings className="h-4 w-4 mr-1" />
            Ferramentas SEO
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Otimização de SEO</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div className="cursor-default w-full">
              <SEOAnalyzer description={description} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <div className="cursor-default w-full">
              <SEOChecklist description={description} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <div className="cursor-default w-full">
              <MetaTagValidator description={description} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <div className="cursor-default w-full">
              <ImageOptimizer 
                description={description} 
                onUpdateImage={handleUpdateImage}
              />
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Recursos de IA</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <div className="cursor-default w-full">
              <AIContentRecommender description={description} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Separator orientation="vertical" className="h-8" />
      
      <div className="flex space-x-1">
        <SEOAnalyzer description={description} />
        <SEOChecklist description={description} />
        <MetaTagValidator description={description} />
        <ImageOptimizer 
          description={description} 
          onUpdateImage={handleUpdateImage}
        />
        <AIContentRecommender description={description} />
      </div>
    </div>
  );
};

export default SEOTools;
