
import React, { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/editor';
import BlockRenderer from './blocks/BlockRenderer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, Smartphone, Monitor } from 'lucide-react';

const Preview: React.FC = () => {
  const { description, getHtmlOutput } = useEditorStore();
  const [deviceView, setDeviceView] = React.useState<'desktop' | 'mobile'>('desktop');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  
  // Update HTML output whenever description changes
  useEffect(() => {
    if (description) {
      // Generate fresh HTML output
      try {
        const output = getHtmlOutput();
        console.log('Generated HTML output:', output.substring(0, 100) + '...');
        setHtmlOutput(output);
      } catch (error) {
        console.error('Error generating HTML output:', error);
      }
    }
  }, [description, getHtmlOutput]);
  
  if (!description) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
        <Eye className="h-12 w-12 mb-4 opacity-20" />
        <p>Pré-visualização da descrição</p>
        <p className="text-sm mt-2">Crie uma descrição para visualizar o resultado final</p>
      </div>
    );
  }
  
  const visibleBlocks = description.blocks.filter(block => block.visible);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <h2 className="font-medium">Pré-visualização</h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={deviceView === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor className="h-4 w-4 mr-1" />
            Desktop
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className={`p-4 mx-auto ${deviceView === 'mobile' ? 'max-w-sm border-x border-gray-200' : ''}`}>
          {visibleBlocks.length > 0 ? (
            visibleBlocks.map((block) => (
              <div key={block.id} className="mb-6">
                <BlockRenderer block={block} isPreview />
              </div>
            ))
          ) : (
            <div className="text-center p-8 text-gray-500">
              <p>Nenhum bloco visível para exibir.</p>
              <p className="text-sm mt-2">Adicione blocos no editor para visualizar.</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Debug section for checking raw HTML output */}
      <div className="hidden">
        <pre>{htmlOutput}</pre>
      </div>
    </div>
  );
};

export default Preview;
