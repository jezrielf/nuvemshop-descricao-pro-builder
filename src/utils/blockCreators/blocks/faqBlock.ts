
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createFAQBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'faq',
    title: 'Perguntas Frequentes',
    columns,
    visible: true,
    heading: 'Perguntas Frequentes',
    questions: [
      {
        id: uuidv4(),
        question: 'Qual é o prazo de entrega?',
        answer: 'O prazo médio de entrega é de 5 a 7 dias úteis.'
      },
      {
        id: uuidv4(),
        question: 'Como posso rastrear meu pedido?',
        answer: 'Você receberá um código de rastreamento por e-mail após o envio.'
      },
      {
        id: uuidv4(),
        question: 'Posso trocar o produto?',
        answer: 'Sim, você tem até 7 dias após o recebimento para solicitar a troca.'
      }
    ]
  } as Block;
};
