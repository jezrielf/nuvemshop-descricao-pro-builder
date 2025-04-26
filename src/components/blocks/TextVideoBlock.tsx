
import React, { useState, useEffect } from 'react';
import { TextVideoBlock as TextVideoBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import RichTextEditor from './editors/RichTextEditor';

interface TextVideoBlockProps {
  block: TextVideoBlockType;
  isPreview?: boolean;
}

const TextVideoBlock: React.FC<TextVideoBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  const updateField = (field: string, value: any) => {
    updateBlock(block.id, { [field]: value });
  };
  
  useEffect(() => {
    // Extrair ID do vídeo da URL do YouTube
    const getYouTubeEmbedUrl = (url: string) => {
      // Lidar com diferentes formatos de URLs do YouTube
      const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
      const match = url.match(regExp);
      
      if (match && match[1]) {
        // Formar URL de incorporação com parâmetros de autoplay e mudo
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=${block.autoplay ? '1' : '0'}&mute=${block.muteAudio ? '1' : '0'}&rel=0`;
      }
      
      return '';
    };
    
    setEmbedUrl(getYouTubeEmbedUrl(block.videoUrl));
  }, [block.videoUrl, block.autoplay, block.muteAudio]);

  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {block.heading && (
              <h3 className="text-xl font-semibold mb-3" style={{ color: block.style?.headingColor || 'inherit' }}>
                {block.heading}
              </h3>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
          </div>
          <div className="md:w-1/2 flex-shrink-0">
            <div className="aspect-w-16 aspect-h-9">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={block.heading || "Vídeo"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              ) : (
                <div className="bg-gray-100 p-4 rounded text-center h-full flex items-center justify-center">
                  <p>URL de vídeo inválida</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="space-y-6">
        <div className="grid gap-4">
          <div>
            <Label htmlFor={`heading-${block.id}`}>Título da Seção</Label>
            <Input
              id={`heading-${block.id}`}
              value={block.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              placeholder="Título da seção"
            />
          </div>
          
          <div>
            <Label htmlFor={`videoUrl-${block.id}`}>URL do Vídeo</Label>
            <Input
              id={`videoUrl-${block.id}`}
              value={block.videoUrl}
              onChange={(e) => updateField('videoUrl', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-gray-500 mt-1">Cole a URL do vídeo do YouTube aqui.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center space-x-2">
              <Switch
                id={`autoplay-${block.id}`}
                checked={block.autoplay || false}
                onCheckedChange={(checked) => updateField('autoplay', checked)}
              />
              <Label htmlFor={`autoplay-${block.id}`}>Reprodução Automática</Label>
            </div>
            
            <div className="flex flex-row items-center space-x-2">
              <Switch
                id={`mute-${block.id}`}
                checked={block.muteAudio || false}
                onCheckedChange={(checked) => updateField('muteAudio', checked)}
              />
              <Label htmlFor={`mute-${block.id}`}>Silenciar Áudio</Label>
            </div>
          </div>
          
          <div>
            <Label>Conteúdo de Texto</Label>
            <div className="mt-2">
              <RichTextEditor
                value={block.content}
                onChange={(value) => updateField('content', value)}
              />
            </div>
          </div>
        </div>
        
        {!embedUrl && block.videoUrl && (
          <div className="bg-red-50 p-4 rounded text-red-600 text-sm">
            URL de vídeo inválida. Por favor, use uma URL válida do YouTube.
          </div>
        )}
        
        {embedUrl && (
          <div className="mt-4 border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Pré-visualização do Layout</h4>
            <div className="flex flex-col md:flex-row gap-6 p-4 border rounded">
              <div className="md:w-1/2">
                <div className="prose prose-sm border p-3 rounded bg-gray-50 h-full">
                  <h3 className="text-gray-500">{block.heading || "Título da Seção"}</h3>
                  <div className="text-gray-400 text-sm">
                    O texto será exibido aqui, formatado conforme o editor.
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex-shrink-0">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={embedUrl}
                    title="Pré-visualização do vídeo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BlockWrapper>
  );
};

export default TextVideoBlock;
