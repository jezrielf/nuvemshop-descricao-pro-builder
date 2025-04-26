
import React, { useState } from 'react';
import { VideoTextBlock as VideoTextBlockType } from '@/types/editor/blocks';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editor';
import { Switch } from '@/components/ui/switch';
import RichTextEditor from './editors/RichTextEditor';

interface VideoTextBlockProps {
  block: VideoTextBlockType;
  isPreview?: boolean;
}

const VideoTextBlock: React.FC<VideoTextBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isSelected = selectedBlockId === block.id;
  
  const [activeTab, setActiveTab] = useState('content');
  
  // Extract YouTube video ID and create embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url.match(regExp);
    
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${block.autoplay ? '1' : '0'}&mute=${block.muteAudio ? '1' : '0'}&rel=0`;
    }
    
    return '';
  };
  
  const embedUrl = getYouTubeEmbedUrl(block.videoUrl);
  
  // Calculate aspect ratio for the video
  const getAspectRatioValue = () => {
    switch (block.aspectRatio) {
      case '16:9': return 16 / 9;
      case '4:3': return 4 / 3;
      case '1:1': return 1;
      default: return 16 / 9;
    }
  };
  
  // Handlers for editing
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, { ...block, videoUrl: e.target.value });
  };
  
  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, { ...block, heading: e.target.value });
  };
  
  const handleContentChange = (value: string) => {
    updateBlock(block.id, { ...block, content: value });
  };
  
  const handleAutoplayChange = (checked: boolean) => {
    updateBlock(block.id, { ...block, autoplay: checked });
  };
  
  const handleMuteChange = (checked: boolean) => {
    updateBlock(block.id, { ...block, muteAudio: checked });
  };
  
  const handleAspectRatioChange = (value: string) => {
    updateBlock(block.id, { ...block, aspectRatio: value });
  };
  
  if (isPreview) {
    // Simple preview rendering
    return (
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="md:w-1/2">
          <AspectRatio ratio={getAspectRatioValue()}>
            {embedUrl ? (
              <iframe 
                src={embedUrl}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full rounded"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded">
                URL de vídeo inválida
              </div>
            )}
          </AspectRatio>
        </div>
        <div className="md:w-1/2">
          {block.heading && <h3 className="text-xl font-semibold mb-3">{block.heading}</h3>}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      </div>
    );
  }
  
  // Full editor rendering
  return (
    <Card className={`p-4 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">{block.title}</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="video">Vídeo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <div>
              <Label htmlFor={`${block.id}-heading`}>Título da Seção</Label>
              <Input
                id={`${block.id}-heading`}
                value={block.heading || ''}
                onChange={handleHeadingChange}
                placeholder="Título da seção (opcional)"
              />
            </div>
            
            <div>
              <Label htmlFor={`${block.id}-content`}>Conteúdo</Label>
              <RichTextEditor
                value={block.content}
                onChange={handleContentChange}
                placeholder="Adicione seu texto aqui..."
                className="min-h-[150px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="space-y-4 pt-4">
            <div>
              <Label htmlFor={`${block.id}-video-url`}>URL do Vídeo (YouTube)</Label>
              <Input
                id={`${block.id}-video-url`}
                value={block.videoUrl}
                onChange={handleVideoUrlChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${block.id}-autoplay`}
                    checked={block.autoplay}
                    onCheckedChange={handleAutoplayChange}
                  />
                  <Label htmlFor={`${block.id}-autoplay`}>Reprodução automática</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${block.id}-mute`}
                    checked={block.muteAudio}
                    onCheckedChange={handleMuteChange}
                  />
                  <Label htmlFor={`${block.id}-mute`}>Silenciar áudio</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor={`${block.id}-aspect-ratio`}>Proporção</Label>
              <div className="flex space-x-2 mt-1">
                <Button
                  type="button"
                  variant={block.aspectRatio === '16:9' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleAspectRatioChange('16:9')}
                >
                  16:9
                </Button>
                <Button
                  type="button"
                  variant={block.aspectRatio === '4:3' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleAspectRatioChange('4:3')}
                >
                  4:3
                </Button>
                <Button
                  type="button"
                  variant={block.aspectRatio === '1:1' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleAspectRatioChange('1:1')}
                >
                  1:1
                </Button>
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Preview</Label>
              <AspectRatio ratio={getAspectRatioValue()} className="mt-2 bg-gray-100 rounded overflow-hidden">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                    URL de vídeo inválida ou não inserida
                  </div>
                )}
              </AspectRatio>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default VideoTextBlock;
