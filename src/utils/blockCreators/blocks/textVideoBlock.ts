
import { v4 as uuidv4 } from 'uuid';
import { TextVideoBlock } from '@/types/editor/blocks';
import { ColumnLayout } from '@/types/editor';

export function createTextVideoBlock(columns: ColumnLayout = 'full'): TextVideoBlock {
  try {
    const block: TextVideoBlock = {
      id: uuidv4(),
      type: 'textVideo',
      title: 'Texto e Vídeo',
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
        headingWeight: 'bold',
        blockSpacing: 'normal',
        borderRadius: 'md',
        boxShadow: 'none'
      }
    };
    
    console.log(`TextVideo block created successfully with ID: ${block.id}`);
    return block;
  } catch (error) {
    console.error('Error creating TextVideo block:', error);
    throw new Error('Erro ao criar bloco de Texto e Vídeo');
  }
}
