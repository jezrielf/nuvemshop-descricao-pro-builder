
import { FAQBlock } from '@/types/editor/blocks/faq';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map(item => `
      <div style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
        <div style="padding:12px 16px;background-color:#f9fafb;font-weight:500;border-bottom:1px solid #e5e7eb;">${item.question}</div>
        <div style="padding:16px;background-color:white;">${item.answer}</div>
      </div>
    `).join('')
    : '';
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div>${faqHtml}</div>
    </div>
  `;
};
