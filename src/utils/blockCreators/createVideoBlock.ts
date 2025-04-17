
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks';
import { ColumnLayout } from '@/types/editor';

export function createVideoBlock(columns: ColumnLayout = 'full'): VideoBlock {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    videoUrl: '',
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true,
    heading: 'Vídeo do Produto',
    columns,
    visible: true,
    style: {
      headingColor: '#333333',
    }
  };
}
