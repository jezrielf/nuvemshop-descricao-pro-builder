
import { v4 as uuidv4 } from 'uuid';
import { TextVideoBlock } from '@/types/editor/blocks';
import { ColumnLayout } from '@/types/editor';

export function createTextVideoBlock(columns: ColumnLayout = 'full'): TextVideoBlock {
  return {
    id: uuidv4(),
    type: 'textVideo',
    title: 'Texto e Vídeo',
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
