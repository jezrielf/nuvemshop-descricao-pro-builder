
import React, { useState, useEffect } from 'react';
import { TextVideoBlock as TextVideoBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RichTextEditor } from '../RichTextEditor';

interface TextVideoBlockProps {
  block: TextVideoBlockType;
  isPreview?: boolean;
}

const formSchema = z.object({
  videoUrl: z.string().url({ message: "URL inválida" }),
  headline: z.string(),
  content: z.string(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  autoplay: z.boolean().default(false),
  muteAudio: z.boolean().default(true)
});

const TextVideoBlock: React.FC<TextVideoBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: block.videoUrl,
      headline: block.headline || '',
      content: block.content || '',
      buttonText: block.buttonText || '',
      buttonUrl: block.buttonUrl || '',
      autoplay: block.autoplay ?? false,
      muteAudio: block.muteAudio ?? true
    }
  });

  const onValueChange = (field: string, value: any) => {
    updateBlock(block.id, { [field]: value });
  };
  
  useEffect(() => {
    const getYouTubeEmbedUrl = (url: string) => {
      const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
      const match = url.match(regExp);
      
      if (match && match[1]) {
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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 order-2 md:order-1">
            {block.headline && (
              <h3 className="text-2xl font-semibold mb-4">{block.headline}</h3>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
            
            {block.buttonText && block.buttonUrl && (
              <a 
                href={block.buttonUrl}
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {block.buttonText}
              </a>
            )}
          </div>
          <div className="flex-1 order-1 md:order-2">
            {embedUrl ? (
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={embedUrl}
                  title={block.headline || "Vídeo"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded text-center aspect-w-16 aspect-h-9">
                <p>URL de vídeo inválida</p>
              </div>
            )}
          </div>
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="space-y-6">
        <Form {...form}>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Título da seção" 
                          onChange={(e) => {
                            field.onChange(e);
                            onValueChange('headline', e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="mt-4">
                  <Label>Conteúdo</Label>
                  <div className="mt-2">
                    <RichTextEditor 
                      value={block.content || ''} 
                      onChange={(value) => onValueChange('content', value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="buttonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Texto do Botão</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Saiba mais" 
                            onChange={(e) => {
                              field.onChange(e);
                              onValueChange('buttonText', e.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="buttonUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link do Botão</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="https://..." 
                            onChange={(e) => {
                              field.onChange(e);
                              onValueChange('buttonUrl', e.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
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
                
                <div className="space-y-4 mt-4">
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
            </div>
          </div>
        </Form>
      </div>
    </BlockWrapper>
  );
};

export default TextVideoBlock;
