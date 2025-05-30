
import React, { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, Smartphone, Monitor } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePreviewFocus } from './Preview/hooks/usePreviewFocus';

const Preview: React.FC = () => {
  const { description, getHtmlOutput, focusedBlockId } = useEditorStore();
  const [deviceView, setDeviceView] = React.useState<'desktop' | 'mobile'>('desktop');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const isMobile = useIsMobile();
  const { previewRef } = usePreviewFocus();
  
  // Update HTML output whenever description changes
  useEffect(() => {
    console.log('Preview useEffect triggered - description:', !!description);
    console.log('Preview useEffect triggered - blocks count:', description?.blocks?.length || 0);
    
    if (description) {
      try {
        // Generate fresh HTML output
        let output = getHtmlOutput();
        console.log('Generated HTML output length:', output.length);
        console.log('Generated HTML output preview:', output.substring(0, 200) + '...');
        
        // Add data attributes to blocks for focus functionality
        if (description.blocks) {
          description.blocks.forEach(block => {
            const blockPattern = new RegExp(`(<[^>]*class="[^"]*block-${block.type}[^"]*"[^>]*>)`, 'gi');
            output = output.replace(blockPattern, `$1<div data-preview-block-id="${block.id}" class="preview-block-wrapper ${focusedBlockId === block.id ? 'preview-focused' : ''}">`);
          });
        }
        
        setHtmlOutput(output);
      } catch (error) {
        console.error('Error generating HTML output in Preview:', error);
        setHtmlOutput('<p>Erro ao gerar pré-visualização</p>');
      }
    } else {
      console.log('No description available for preview');
      setHtmlOutput('');
    }
  }, [description, description?.blocks, getHtmlOutput, focusedBlockId]);
  
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
  console.log('Visible blocks count:', visibleBlocks.length);
  
  return (
    <div className="h-full flex flex-col">
      <style>
        {`
          .preview-focused {
            animation: focusPulse 2s ease-in-out;
            outline: 2px solid #3b82f6;
            outline-offset: 4px;
            border-radius: 8px;
          }
          
          @keyframes focusPulse {
            0% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            }
            50% { 
              box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
            }
            100% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
          }
        `}
      </style>
      
      <div className="p-2 sm:p-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-medium text-sm sm:text-base">Pré-visualização</h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={deviceView === 'desktop' ? 'default' : 'outline'}
            size="sm"
            className="text-xs sm:text-sm h-8"
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">Desktop</span>
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'default' : 'outline'}
            size="sm"
            className="text-xs sm:text-sm h-8"
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">Mobile</span>
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 h-[calc(100%-50px)]">
        <div 
          ref={previewRef}
          className={`p-4 mx-auto ${deviceView === 'mobile' ? 'max-w-sm border-x border-gray-200' : ''}`}
        >
          {htmlOutput && htmlOutput.trim() ? (
            <div 
              className="preview-container"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          ) : visibleBlocks.length > 0 ? (
            <div className="text-center p-8 text-gray-500">
              <p>Gerando pré-visualização...</p>
              <p className="text-sm mt-2">Se o problema persistir, tente recarregar a página.</p>
            </div>
          ) : (
            <div className="text-center p-8 text-gray-500">
              <p>Nenhum bloco visível para exibir.</p>
              <p className="text-sm mt-2">Adicione blocos no editor para visualizar.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Preview;
