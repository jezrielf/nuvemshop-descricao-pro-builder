
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, FAQBlock } from '@/types/editor';

export const createFAQBlock = (columns: number = 1): FAQBlock => ({
  id: uuidv4(),
  type: 'faq',
  title: 'Bloco de FAQ',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Perguntas Frequentes',
  questions: [
    { id: uuidv4(), question: 'Pergunta 1', answer: 'Resposta 1' },
    { id: uuidv4(), question: 'Pergunta 2', answer: 'Resposta 2' },
  ],
});
