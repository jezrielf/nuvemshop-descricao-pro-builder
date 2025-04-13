
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Generate each FAQ item using the CSS classes defined in the style block
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => {
        const questionId = `faq-${block.id}-${index}`;
        // Determine if this is the last item for special styling
        const isLastItem = index === block.questions.length - 1;
        const itemStyle = isLastItem ? '' : 'margin-bottom: 10px;';
        
        return `
          <div class="faq-item" style="${itemStyle}">
            <input type="checkbox" id="${questionId}" class="faq-toggle" style="display: none;">
            <label for="${questionId}" class="faq-question">
              ${item.question}
              <span class="faq-icon" style="position: absolute; right: 15px; top: 15px; transform: rotate(0); transition: transform 0.3s ease;">+</span>
            </label>
            <div class="faq-answer">
              <div class="faq-answer-content">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // Complete FAQ block HTML that works with the CSS in the style block
  return `
    <div${blockStyleAttr} id="faq-block-${block.id}" class="faq-container">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${block.heading}</h2>
      <div>
        ${faqHtml}
      </div>
    </div>
  `;
};
