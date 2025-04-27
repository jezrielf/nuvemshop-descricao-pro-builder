
import { v4 as uuidv4 } from 'uuid';
import { VideoTextBlock } from '@/types/editor/blocks';
import { ColumnLayout } from '@/types/editor';

export function createVideoTextBlock(columns: ColumnLayout = 'full'): VideoTextBlock {
  try {
    const block: VideoTextBlock = {
      id: uuidv4(),
      type: 'videoText',
      title: 'Vídeo e Texto',
      columns,
      visible: true,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      aspectRatio: '16:9',
      autoplay: false,
      muteAudio: true,
      heading: 'Título da Seção',
      content: '<p>Adicione o texto aqui.</p>',
      style: {
        headingColor: '#333333',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        headingWeight: 'medium',
        blockSpacing: 'md',
        borderRadius: 'md',
        boxShadow: 'none',
        padding: 'md',
        textAlign: 'left'
      }
    };
    
    console.log(`VideoText block created successfully with ID: ${block.id}`);
    return block;
  } catch (error) {
    console.error('Error creating VideoText block:', error);
    throw new Error('Erro ao criar bloco de Vídeo e Texto');
  }
}
