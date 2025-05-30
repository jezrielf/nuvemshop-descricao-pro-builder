
import React, { useEffect, useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, Smartphone, Monitor, RefreshCw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePreviewFocus } from './Preview/hooks/usePreviewFocus';

const Preview: React.FC = () => {
  const { description, getHtmlOutput, focusedBlockId } = useEditorStore();
  const [deviceView, setDeviceView] = React.useState<'desktop' | 'mobile'>('desktop');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();
  const { previewRef } = usePreviewFocus();
  
  const generatePreview = () => {
    if (!description) {
      console.log('Preview: Nenhuma descrição ativa');
      setHtmlOutput('');
      return;
    }
    
    console.log('Preview: Iniciando geração de HTML', {
      descriptionId: description.id,
      descriptionName: description.name,
      blocksCount: description.blocks?.length || 0
    });
    
    setIsGenerating(true);
    
    try {
      // Generate fresh HTML output
      const output = getHtmlOutput();
      console.log('Preview: HTML gerado:', output.substring(0, 200) + '...');
      
      let processedOutput = output;
      
      // Add data attributes to blocks for focus functionality
      if (description.blocks && description.blocks.length > 0) {
        description.blocks.forEach(block => {
          if (block.visible !== false) {
            const blockId = block.id;
            const isFocused = focusedBlockId === blockId;
            
            // Add wrapper div with focus styling if needed
            const focusClass = isFocused ? 'preview-focused' : '';
            const wrapperDiv = `<div data-preview-block-id="${blockId}" class="preview-block-wrapper ${focusClass}">`;
            
            // Try to wrap each block's HTML content
            const blockPattern = new RegExp(`(<div[^>]*class="[^"]*${block.type}-block[^"]*"[^>]*>.*?</div>)`, 'gis');
            processedOutput = processedOutput.replace(blockPattern, `${wrapperDiv}$1</div>`);
          }
        });
      }
      
      console.log('Preview: HTML processado com sucesso');
      setHtmlOutput(processedOutput);
    } catch (error) {
      console.error('Preview: Erro ao gerar HTML:', error);
      setHtmlOutput('<div class="error-preview">Erro ao gerar pré-visualização</div>');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Update HTML output whenever description changes
  useEffect(() => {
    console.log('Preview: useEffect executado', { hasDescription: !!description });
    generatePreview();
  }, [description, getHtmlOutput, focusedBlockId]);
  
  const handleRefresh = () => {
    console.log('Preview: Refresh manual solicitado');
    generatePreview();
  };
  
  if (!description) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400">
        <Eye className="h-12 w-12 mb-4 opacity-20" />
        <p>Pré-visualização da descrição</p>
        <p className="text-sm mt-2">Crie uma descrição para visualizar o resultado final</p>
      </div>
    );
  }
  
  const visibleBlocks = description.blocks?.filter(block => block.visible !== false) || [];
  
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
          
          .error-preview {
            padding: 20px;
            text-align: center;
            color: #ef4444;
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            margin: 20px;
          }
        `}
      </style>
      
      <div className="p-2 sm:p-4 border-b bg-gray-50 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-medium text-sm sm:text-base">Pré-visualização</h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8"
            onClick={handleRefresh}
            disabled={isGenerating}
          >
            <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">Atualizar</span>
          </Button>
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
          {isGenerating ? (
            <div className="text-center p-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Gerando pré-visualização...</p>
            </div>
          ) : visibleBlocks.length > 0 ? (
            <div 
              className="preview-container"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          ) : (
            <div className="text-center p-8 text-gray-500">
              <p>Nenhum bloco visível para exibir.</p>
              <p className="text-sm mt-2">Adicione blocos no editor para visualizar.</p>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                className="mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Preview;
