
import { TextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateCompanyTextBlock = (
  companyInfo: string,
  hasModelImage: boolean
): TextBlock => {
  const companyBlock = createBlock('text', 1) as TextBlock;
  companyBlock.visible = true;
  companyBlock.title = 'Sobre a Empresa';
  companyBlock.heading = 'Sobre Nossa Empresa';
  companyBlock.content = companyInfo;
  companyBlock.style = {
    backgroundColor: hasModelImage ? '#ffffff' : '#ffffff',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return companyBlock;
};
