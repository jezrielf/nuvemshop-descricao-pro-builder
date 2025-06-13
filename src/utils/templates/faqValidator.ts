
import { v4 as uuidv4 } from 'uuid';
import { FAQBlock } from '@/types/editor';

export const ensureFAQHasIds = (faqBlock: any): FAQBlock => {
  if (faqBlock.type === 'faq' && faqBlock.questions) {
    const questionsWithIds = faqBlock.questions.map((question: any) => {
      if (!question.id) {
        return {
          ...question,
          id: uuidv4()
        };
      }
      return question;
    });

    return {
      ...faqBlock,
      questions: questionsWithIds
    };
  }
  
  return faqBlock;
};

export const validateTemplateBlocks = (blocks: any[]): any[] => {
  return blocks.map(block => {
    if (block.type === 'faq') {
      return ensureFAQHasIds(block);
    }
    return block;
  });
};
