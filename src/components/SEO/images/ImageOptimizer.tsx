
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';

interface ImageOptimizerProps {
  description: ProductDescription | null;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ description, onUpdateImage }) => {
  const [open, setOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="w-full text-left py-1.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={handleClick}
        >
          Otimizar Imagens
        </button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Otimizador de Imagens</h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Analise e otimize as imagens da sua descrição para melhorar o SEO e o tempo de carregamento.
          </p>
          
          {description && description.blocks.filter(block => 
            block.type === 'image' || 
            block.type === 'gallery' || 
            (block.type === 'hero' && block.imageUrl)
          ).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-md font-medium">Imagens encontradas:</h3>
              <div className="grid grid-cols-1 gap-4">
                {description.blocks.map(block => {
                  if (block.type === 'image' && block.imageUrl) {
                    return (
                      <div key={block.id} className="border rounded-md p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{block.title || 'Imagem'}</span>
                          <button 
                            className="text-xs text-blue-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateImage(block.id, 'imageUrl', block.imageUrl);
                            }}
                          >
                            Otimizar
                          </button>
                        </div>
                        <img 
                          src={block.imageUrl} 
                          alt={block.alt || 'Imagem da descrição'} 
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="text-xs text-gray-500">
                          {block.alt ? (
                            <p>Alt text: {block.alt}</p>
                          ) : (
                            <p className="text-amber-600">⚠️ Texto alternativo não definido</p>
                          )}
                        </div>
                      </div>
                    );
                  }
                  
                  if (block.type === 'gallery' && block.images && block.images.length > 0) {
                    return (
                      <div key={block.id} className="border rounded-md p-3 space-y-2">
                        <span className="font-medium">{block.title || 'Galeria'}</span>
                        <div className="grid grid-cols-3 gap-2">
                          {block.images.slice(0, 3).map((image, index) => (
                            <img 
                              key={index}
                              src={image.url} 
                              alt={image.alt || `Imagem ${index + 1}`} 
                              className="w-full h-20 object-cover rounded-md"
                            />
                          ))}
                        </div>
                        <button 
                          className="text-xs text-blue-600 hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Optimize gallery logic would go here
                          }}
                        >
                          Otimizar todas ({block.images.length})
                        </button>
                      </div>
                    );
                  }
                  
                  if (block.type === 'hero' && block.imageUrl) {
                    return (
                      <div key={block.id} className="border rounded-md p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Banner Hero</span>
                          <button 
                            className="text-xs text-blue-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateImage(block.id, 'imageUrl', block.imageUrl);
                            }}
                          >
                            Otimizar
                          </button>
                        </div>
                        <img 
                          src={block.imageUrl} 
                          alt="Banner principal" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma imagem encontrada na descrição.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptimizer;
