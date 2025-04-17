
import React from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { VideoFormValues } from './types';
import VideoPreview from './VideoPreview';

interface VideoFormProps {
  block: VideoBlockType;
  form: UseFormReturn<VideoFormValues>;
}

const VideoForm: React.FC<VideoFormProps> = ({ block, form }) => {
  const { updateBlock } = useEditorStore();

  // Update block when form values change
  const onValueChange = (field: string, value: any) => {
    updateBlock(block.id, { [field]: value });
  };

  return (
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
        </div>
      </Form>
      
      <VideoPreview block={block} editorPreview />
    </div>
  );
};

export default VideoForm;
