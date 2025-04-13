
import { v4 as uuidv4 } from 'uuid';
import { SpecificationsBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateSpecificationsBlock = (
  additionalInfo: string,
  hasModelImage: boolean
): SpecificationsBlock | null => {
  if (!additionalInfo || additionalInfo.length <= 20) {
    return null;
  }
  
  const specificationsBlock = createBlock('specifications', 2) as SpecificationsBlock;
  specificationsBlock.visible = true;
  specificationsBlock.title = 'Especificações';
  specificationsBlock.heading = 'Especificações Técnicas';
  
  // Generate some mock specifications from additional info
  const specLines = additionalInfo.split('.');
  specificationsBlock.specs = [
    { id: uuidv4(), name: 'Material', value: 'Premium' },
    { id: uuidv4(), name: 'Garantia', value: '12 meses' },
    { id: uuidv4(), name: 'Origem', value: 'Brasil' },
    ...specLines.slice(0, 3).map((line, index) => ({
      id: uuidv4(),
      name: `Especificação ${index + 1}`,
      value: line.trim()
    }))
  ].filter(spec => spec.value.length > 3);
  
  specificationsBlock.style = {
    backgroundColor: hasModelImage ? '#fafafa' : '#f9fafb',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return specificationsBlock;
};
