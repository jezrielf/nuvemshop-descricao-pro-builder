
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateProductHeading = (addBlock: (block: Block) => void) => {
  // Product details section - heading
  const productsHeadingBlock = createBlock('text', 1);
  if (productsHeadingBlock && productsHeadingBlock.type === 'text') {
    productsHeadingBlock.heading = 'Sua saúde é seu bem mais valioso, pois sem ela, nenhum outro bem se faz possível';
    productsHeadingBlock.content = `
      <h3 style="font-size: 22px; font-weight: bold; color: #69B345; margin: 0 0 30px 0; text-align: center;">
        Confira como cada um dos produtos estão prestes a transformar sua realidade:
      </h3>
    `;
    productsHeadingBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      textAlign: 'center',
    };
    addBlock(productsHeadingBlock);
  }
};
