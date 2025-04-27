
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Settings, ChevronDown } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import SEOAnalyzer from '../analyzers/SEOAnalyzer';
import SEOChecklist from '../checklist/SEOChecklist';
import MetaTagValidator from '../metatags/MetaTagValidator';
import ImageOptimizer from '../images/ImageOptimizer';
import AIContentRecommender from '../../AIGenerator/AIContentRecommender';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { updateBlockImage } from '../utils/imageUtils';

interface SEOToolsMenuProps {
  description: ProductDescription | null;
  onUpdateImage?: (blockId: string, imageType: string, newImageUrl: string) => void;
}

export const SEOToolsMenu: React.FC<SEOToolsMenuProps> = ({ 
  description,
  onUpdateImage
}) => {
  const [open, setOpen] = useState(false);
  
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    if (onUpdateImage) {
      onUpdateImage(blockId, imageType, newImageUrl);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Settings className="h-4 w-4 mr-1" />
          Ferramentas SEO
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-72 p-3 bg-white max-h-[80vh] overflow-y-auto"
        sideOffset={5}
      >
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Otimização de SEO</h4>
          <div className="grid gap-1.5">
            <SEOToolButton onClick={() => {}} label="Ferramentas SEO">
              <SEOAnalyzer description={description} />
            </SEOToolButton>
            
            <SEOToolButton onClick={() => {}} label="Checklist SEO">
              <SEOChecklist description={description} />
            </SEOToolButton>
            
            <SEOToolButton onClick={() => {}} label="Meta Tags">
              <MetaTagValidator description={description} />
            </SEOToolButton>
            
            <SEOToolButton onClick={() => {}} label="Otimizar Imagens">
              <ImageOptimizer 
                description={description} 
                onUpdateImage={handleUpdateImage}
              />
            </SEOToolButton>
          </div>
          
          <Separator className="my-2" />
          
          <h4 className="text-sm font-medium">Recursos de IA</h4>
          <div className="grid gap-1.5">
            <SEOToolButton onClick={() => {}} label="Recomendações de IA">
              <AIContentRecommender description={description} />
            </SEOToolButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface SEOToolButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}

// Componente auxiliar para simplificar a estrutura
const SEOToolButton: React.FC<SEOToolButtonProps> = ({ children, onClick, label }) => {
  return (
    <div className="w-full">
      <Button
        variant="ghost"
        className="w-full justify-start text-left font-normal h-auto py-1.5 px-2 hover:bg-gray-100"
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};
