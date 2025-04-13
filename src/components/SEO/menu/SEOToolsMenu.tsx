
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
import { Settings, ChevronDown } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { SEOToolMenuItem } from './SEOToolMenuItem';
import SEOAnalyzer from '../analyzers/SEOAnalyzer';
import SEOChecklist from '../checklist/SEOChecklist';
import MetaTagValidator from '../metatags/MetaTagValidator';
import ImageOptimizer from '../images/ImageOptimizer';
import AIContentRecommender from '../../AIGenerator/AIContentRecommender';

interface SEOToolsMenuProps {
  description: ProductDescription | null;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

export const SEOToolsMenu: React.FC<SEOToolsMenuProps> = ({ 
  description,
  onUpdateImage
}) => {
  return (
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
        <SEOToolMenuItem>
          <SEOAnalyzer description={description} />
        </SEOToolMenuItem>
        <SEOToolMenuItem>
          <SEOChecklist description={description} />
        </SEOToolMenuItem>
        <SEOToolMenuItem>
          <MetaTagValidator description={description} />
        </SEOToolMenuItem>
        <SEOToolMenuItem>
          <ImageOptimizer 
            description={description} 
            onUpdateImage={onUpdateImage}
          />
        </SEOToolMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Recursos de IA</DropdownMenuLabel>
        <SEOToolMenuItem>
          <AIContentRecommender description={description} />
        </SEOToolMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
