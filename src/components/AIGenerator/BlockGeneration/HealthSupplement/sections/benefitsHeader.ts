
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateBenefitsHeader = (addBlock: (block: Block) => void) => {
  // Add an icon benefits section at the top
  const benefitsHeaderBlock = createBlock('text', 1);
  if (benefitsHeaderBlock && benefitsHeaderBlock.type === 'text') {
    benefitsHeaderBlock.heading = '';
    benefitsHeaderBlock.content = `
      <div style="background-color: #5A2D82; color: #ffffff; padding: 20px 10px; border-radius: 8px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin: 0 auto; text-align: center; font-size: 13px;">
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>🛡️</span></div>
            <span>Aumenta a imunidade contra ameaças externas</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>🌿</span></div>
            <span>Proporciona um efeito detox completo</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>❤️</span></div>
            <span>Melhora a saúde do coração</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>⚡</span></div>
            <span>Combate a queda da libido e cansaço</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>💤</span></div>
            <span>Concede noites de sono profundas e revigorantes</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>⚖️</span></div>
            <span>Auxilia no controle de peso</span>
          </div>
        </div>
      </div>
    `;
    addBlock(benefitsHeaderBlock);
  }
};
