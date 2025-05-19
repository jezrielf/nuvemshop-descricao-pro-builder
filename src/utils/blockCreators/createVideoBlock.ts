
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks/video';
import { ColumnLayout } from '@/types/editor';

export function createVideoBlock(columns: ColumnLayout = 'full'): VideoBlock {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo do Produto',
    videoUrl: '',
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true,
    columns,
    visible: true,
    style: {
      backgroundColor: '#ffffff',
      padding: '40px 20px'
    }
  };
}
