
import React, { useState, useEffect } from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import BlockWrapper from '../BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
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

// Schema de validação para o formulário
const formSchema = z.object({
  videoUrl: z.string().url({ message: "URL inválida" }),
  title: z.string(),
  description: z.string().optional(),
  autoplay: z.boolean().default(true),
  muteAudio: z.boolean().default(false)
});

export const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  // Inicializar o formulário com os valores do bloco
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: block.videoUrl,
      title: block.title || '',
      description: block.description || '',
      autoplay: block.autoplay ?? true,
      muteAudio: block.muteAudio ?? false
    }
  });

  // Atualizar o bloco quando os valores do formulário mudarem
  const onValueChange = (field: string, value: any) => {
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
    if (!embedUrl) {
      return (
        <BlockWrapper block={block} isEditing={false}>
          <div className="bg-gray-100 p-4 rounded text-center">
            <p>URL de vídeo inválida</p>
          </div>
        </BlockWrapper>
      );
    }
    
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="video-container">
          {block.title && (
            <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
          )}
          
          <div className="aspect-w-16 aspect-h-9 mb-3">
            <iframe
              src={embedUrl}
              title={block.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          </div>
          
          {block.description && (
            <p className="text-gray-600">{block.description}</p>
          )}
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="space-y-4">
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
                    Cole a URL do vídeo do YouTube aqui.
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
            
            <FormField
              control={form.control}
              name="autoplay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Reprodução Automática</FormLabel>
                    <FormDescription>
                      Iniciar o vídeo automaticamente quando a página carregar
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
                    <FormDescription>
                      Reproduzir o vídeo sem áudio
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
        </Form>
        
        {!embedUrl && block.videoUrl && (
          <div className="bg-red-50 p-4 rounded text-red-600 text-sm">
            URL de vídeo inválida. Por favor, use uma URL válida do YouTube.
          </div>
        )}
        
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
