
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks/video';
import { ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export function createVideoBlock(columns: ColumnLayout = 'full'): VideoBlock {
  const baseBlock = {
    id: uuidv4(),
    type: 'video' as const,
    title: 'Vídeo do Produto',
    videoUrl: '',
    aspectRatio: '16:9' as const,
    autoplay: false,
    muteAudio: true,
    columns,
    visible: true,
    style: {
      backgroundColor: '#ffffff',
      padding: '40px 20px'
    }
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock);
}
