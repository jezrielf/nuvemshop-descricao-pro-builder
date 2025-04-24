
import React from 'react';
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

interface SEOToolsMenuProps {
  description: ProductDescription | null;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

export const SEOToolsMenu: React.FC<SEOToolsMenuProps> = ({ 
  description,
  onUpdateImage
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Settings className="h-4 w-4 mr-1" />
          Ferramentas SEO
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-3 bg-white">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Otimização de SEO</h4>
          <div className="grid gap-1.5">
            <SEOToolButton>
              <SEOAnalyzer description={description} />
            </SEOToolButton>
            
            <SEOToolButton>
              <SEOChecklist description={description} />
            </SEOToolButton>
            
            <SEOToolButton>
              <MetaTagValidator description={description} />
            </SEOToolButton>
            
            <SEOToolButton>
              <ImageOptimizer 
                description={description} 
                onUpdateImage={onUpdateImage}
              />
            </SEOToolButton>
          </div>
          
          <Separator className="my-2" />
          
          <h4 className="text-sm font-medium">Recursos de IA</h4>
          <div className="grid gap-1.5">
            <SEOToolButton>
              <AIContentRecommender description={description} />
            </SEOToolButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Componente auxiliar para simplificar a estrutura
const SEOToolButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};
