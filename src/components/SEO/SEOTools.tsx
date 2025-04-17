
import React from 'react';
import { ProductDescription } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { updateBlockImage } from './utils/imageUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, List, Lightbulb, Image, FileCode } from 'lucide-react';
import SEOAnalyzer from './analyzers/SEOAnalyzer';
import SEOChecklist from './checklist/SEOChecklist';
import MetaTagValidator from './metatags/MetaTagValidator';
import ImageOptimizer from './images/ImageOptimizer';
import AIContentRecommender from '../AIGenerator/AIContentRecommender';

interface SEOToolsProps {
  description: ProductDescription | null;
}

const SEOTools: React.FC<SEOToolsProps> = ({ description }) => {
  const { updateBlock } = useEditorStore();
  
  // Handler for updating image in a block
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    updateBlockImage(blockId, imageType, newImageUrl, updateBlock, description);
  };
  
  // Prevenindo o fechamento ao clicar nos itens do menu
  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Item de ferramenta SEO clicado');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 flex items-center">
          <Settings className="h-4 w-4 mr-1" />
          Ferramentas SEO
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Otimização de SEO</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            <span onClick={handleItemClick} className="flex-1">
              <SEOAnalyzer description={description} />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <List className="h-4 w-4 mr-2" />
            <span onClick={handleItemClick} className="flex-1">
              <SEOChecklist description={description} />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <FileCode className="h-4 w-4 mr-2" />
            <span onClick={handleItemClick} className="flex-1">
              <MetaTagValidator description={description} />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <Image className="h-4 w-4 mr-2" />
            <span onClick={handleItemClick} className="flex-1">
              <ImageOptimizer description={description} onUpdateImage={handleUpdateImage} />
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Recursos de IA</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <Lightbulb className="h-4 w-4 mr-2" />
            <span onClick={handleItemClick} className="flex-1">
              <AIContentRecommender description={description} />
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SEOTools;
