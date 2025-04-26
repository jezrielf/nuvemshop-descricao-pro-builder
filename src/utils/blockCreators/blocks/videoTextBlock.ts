
import { v4 as uuidv4 } from 'uuid';
import { VideoTextBlock } from '@/types/editor/blocks';
import { ColumnLayout } from '@/types/editor';

export function createVideoTextBlock(columns: ColumnLayout = 'full'): VideoTextBlock {
  return {
    id: uuidv4(),
    type: 'videoText',
    title: 'Vídeo e Texto',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true,
    heading: 'Título da Seção',
    content: '<p>Adicione o texto aqui para descrever seu vídeo ou produto. Este texto será exibido ao lado do vídeo.</p>',
    columns,
    visible: true,
    style: {
      headingColor: '#333333',
    }
  };
}
