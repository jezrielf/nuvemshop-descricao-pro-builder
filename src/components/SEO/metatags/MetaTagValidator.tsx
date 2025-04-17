
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { MetaTagDialog } from './components/MetaTagDialog';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description_, setDescription] = useState('');
  const [canonical, setCanonical] = useState('');
  
  // Generate recommended meta tags based on description
  const generateRecommendedMetaTags = () => {
    if (!description) return;
    
    // Generate title from description name
    const generatedTitle = description.name;
    setTitle(generatedTitle);
    
    // Generate description from content
    let contentText = '';
    description.blocks.forEach(block => {
      if (block.type === 'text' && 'content' in block) {
        const plainText = block.content.replace(/<[^>]+>/g, ' ');
        contentText += plainText + ' ';
      }
      else if (block.type === 'hero' && 'subheading' in block) {
        contentText += block.subheading + ' ';
      }
    });
    
    // Trim and limit to 160 characters
    contentText = contentText.trim();
    if (contentText.length > 160) {
      contentText = contentText.substring(0, 157) + '...';
    }
    
    setDescription(contentText);
  };
  
  // Effect to auto-generate meta tags when the dialog opens
  useEffect(() => {
    if (open && description) {
      generateRecommendedMetaTags();
    }
  }, [open, description]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center" onClick={handleClick}>
          <Tag className="h-4 w-4 mr-1" />
          Meta Tags
        </Button>
      </DialogTrigger>
      
      <MetaTagDialog
        open={open}
        onOpenChange={setOpen}
        description={description}
        title={title}
        setTitle={setTitle}
        metaDescription={description_}
        setMetaDescription={setDescription}
        canonical={canonical}
        setCanonical={setCanonical}
        onGenerateRecommendations={generateRecommendedMetaTags}
      />
    </Dialog>
  );
};

export default MetaTagValidator;
