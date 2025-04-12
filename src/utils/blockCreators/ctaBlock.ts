
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, CTABlock } from '@/types/editor';

export const createCTABlock = (columns: number = 1): CTABlock => ({
  id: uuidv4(),
  type: 'cta',
  title: 'Bloco de CTA',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Chamada para Ação',
  content: 'Descrição da chamada para ação...',
  buttonText: 'Ação!',
  buttonUrl: '#',
});
