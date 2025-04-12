
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, BenefitsBlock } from '@/types/editor';

export const createBenefitsBlock = (columns: number = 1): BenefitsBlock => ({
  id: uuidv4(),
  type: 'benefits',
  title: 'Bloco de Benefícios',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Nossos Benefícios',
  benefits: [
    { id: uuidv4(), title: 'Benefício 1', description: 'Descrição do benefício', icon: 'heart' },
    { id: uuidv4(), title: 'Benefício 2', description: 'Descrição do benefício', icon: 'check' },
  ],
});
