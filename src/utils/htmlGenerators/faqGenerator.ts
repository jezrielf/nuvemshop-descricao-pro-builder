
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => `
      <div class="faq-item" style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
        <input type="checkbox" id="faq-${block.id}-${index}" class="faq-toggle" style="display:none;">
        <label for="faq-${block.id}-${index}" class="faq-question" style="padding:12px 16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:block;">
          ${item.question}
          <span class="faq-icon" style="position:absolute;right:16px;top:12px;font-size:18px;">+</span>
        </label>
        <div class="faq-answer" style="max-height:0;overflow:hidden;background-color:white;transition:max-height 0.3s ease;">
          <div class="faq-answer-content" style="padding:16px;">${item.answer}</div>
        </div>
      </div>
    `).join('')
    : '';
  
  // Adicionando CSS inline para o comportamento do accordion
  const faqCss = `
    <style>
      #faq-block-${block.id} input.faq-toggle:checked ~ .faq-answer {
        max-height: 1000px;
      }
      #faq-block-${block.id} input.faq-toggle:checked + label .faq-icon {
        transform: rotate(45deg);
      }
      #faq-block-${block.id} .faq-icon {
        transition: transform 0.3s ease;
      }
    </style>
  `;
  
  return `
    <div${blockStyleAttr} style="width:100%;padding:20px;margin-bottom:20px;" id="faq-block-${block.id}">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div class="faq-items">${faqHtml}</div>
      ${faqCss}
    </div>
  `;
};
