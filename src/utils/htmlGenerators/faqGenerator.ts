
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Generate each FAQ item with all styles inlined directly in the HTML elements
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => {
        // Determine if this is the last item for special styling
        const isLastItem = index === block.questions.length - 1;
        const itemBottomStyle = isLastItem ? 'margin-bottom:0;' : 'margin-bottom:16px;';
        
        return `
          <div class="faq-item" style="${itemBottomStyle}">
            <input type="checkbox" id="faq-${block.id}-${index}" class="faq-toggle" style="display:none;">
            <label for="faq-${block.id}-${index}" class="faq-question">
              ${item.question}
              <span class="faq-icon" style="position:absolute;right:16px;top:12px;font-size:18px;transition:transform 0.3s ease;">+</span>
            </label>
            <div class="faq-answer">
              <div class="faq-answer-content">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // Complete FAQ block HTML
  return `
    <div id="faq-block-${block.id}"${blockStyleAttr} style="width:100%;padding:20px 0;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div style="border-radius:4px;">
        ${faqHtml}
      </div>
    </div>
  `;
};
