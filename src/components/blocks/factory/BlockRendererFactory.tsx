
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import { VideoBlock } from '@/components/blocks/video/VideoBlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

export class BlockRendererFactory {
  static createBlockComponent({ block, isPreview = false }: BlockRendererProps): React.ReactNode {
    if (!block.visible && !isPreview) {
      return null;
    }
    
    try {
      switch (block.type) {
        case 'video':
          return <VideoBlock block={block} isPreview={isPreview} />;
        default:
          console.warn(`Block type ${block.type} not implemented yet`);
          return (
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-500">
                Bloco do tipo "{block.type}" ainda não implementado.
              </p>
            </div>
          );
      }
    } catch (error) {
      console.error(`Error rendering block of type ${block.type}:`, error);
      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <p className="text-sm text-red-500">
            Erro ao renderizar bloco do tipo "{block.type}".
          </p>
        </div>
      );
    }
  }
}
