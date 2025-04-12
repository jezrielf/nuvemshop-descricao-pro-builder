
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateVideoSection = (addBlock: (block: Block) => void) => {
  // Add video block with embedded media
  const videoBlock = createBlock('text', 1);
  if (videoBlock && videoBlock.type === 'text') {
    videoBlock.heading = 'Veja como o Protocolo Saúde e Bem-estar pode transformar sua vida';
    videoBlock.content = `
      <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin: 20px 0;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <!-- Video placeholder with play button -->
          <div style="background-color: #1d1d1f; border-radius: 10px; padding: 20px; min-height: 340px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; margin-bottom: 15px;">
            <div style="font-size: 60px; margin-bottom: 10px;">▶</div>
            <span style="font-size: 14px;">Protocolo da Saúde e Bem-estar - Veja como funciona</span>
          </div>
          <!-- Buttons below video -->
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px;">
            <a href="#" style="background-color: #e0e0e0; color: #333; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 5px; font-weight: 500;">Assistir no ▶ YouTube</a>
            <a href="#beneficios" style="background-color: #69B345; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 5px; font-weight: 500;">Ver benefícios completos</a>
          </div>
        </div>
      </div>
    `;
    videoBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
    };
    addBlock(videoBlock);
  }
};
