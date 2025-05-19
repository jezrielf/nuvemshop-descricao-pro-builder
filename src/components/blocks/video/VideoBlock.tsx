
import React, { useState, useEffect } from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor/blocks/video';
import BlockWrapper from '../BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface VideoBlockProps {
  block: VideoBlockType;
  isPreview?: boolean;
}

// Schema for form validation
const formSchema = z.object({
  videoUrl: z.string().url({ message: "URL inválida" }).or(z.string().length(0)),
  title: z.string(),
  description: z.string().optional(),
  autoplay: z.boolean().default(false),
  muteAudio: z.boolean().default(true)
});

type FormValues = z.infer<typeof formSchema>;

export const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  // Initialize form with block values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: block.videoUrl || '',
      title: block.title || 'Vídeo do Produto',
      description: block.description || '',
      autoplay: block.autoplay ?? false,
      muteAudio: block.muteAudio ?? true
    }
  });

  // Update block when form values change
  const onValueChange = (field: keyof FormValues, value: any) => {
    console.log(`Updating ${field} to:`, value);
    updateBlock(block.id, { [field]: value });
  };
  
  useEffect(() => {
    // Extract YouTube video ID and create embed URL
    const getYouTubeEmbedUrl = (url: string) => {
      if (!url) return '';
      
      // Match YouTube URL patterns
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
      const match = url.match(youtubeRegex);
      
      if (match && match[1]) {
        // Create embed URL with parameters
        const videoId = match[1];
        const params = new URLSearchParams({
          autoplay: block.autoplay ? '1' : '0',
          mute: block.muteAudio ? '1' : '0',
          rel: '0'
        });
        
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      }
      
      return '';
    };
    
    setEmbedUrl(getYouTubeEmbedUrl(block.videoUrl || ''));
  }, [block.videoUrl, block.autoplay, block.muteAudio]);

  // Render preview mode
  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="video-container">
          {block.title && (
            <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
          )}
          
          <div className="aspect-w-16 aspect-h-9 mb-3">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={block.title || 'Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                <p className="text-gray-500">URL de vídeo não definida</p>
              </div>
            )}
          </div>
          
          {block.description && (
            <p className="text-gray-600">{block.description}</p>
          )}
        </div>
      </BlockWrapper>
    );
  }
  
  // Render edit mode
  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="space-y-4 p-4">
        <Form {...form}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Vídeo</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      onChange={(e) => {
                        field.onChange(e);
                        onValueChange('videoUrl', e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Cole a URL do vídeo do YouTube aqui
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Título do vídeo" 
                      onChange={(e) => {
                        field.onChange(e);
                        onValueChange('title', e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Descrição do vídeo" 
                      onChange={(e) => {
                        field.onChange(e);
                        onValueChange('description', e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="autoplay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Reprodução Automática</FormLabel>
                      <FormDescription className="text-xs">
                        Iniciar automaticamente
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          onValueChange('autoplay', checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="muteAudio"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Silenciar Áudio</FormLabel>
                      <FormDescription className="text-xs">
                        Sem som
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          onValueChange('muteAudio', checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>
        
        {/* Preview */}
        {embedUrl && (
          <div className="mt-4 border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Pré-visualização</h4>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={embedUrl}
                title="Pré-visualização do vídeo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </BlockWrapper>
  );
};

export default VideoBlock;
