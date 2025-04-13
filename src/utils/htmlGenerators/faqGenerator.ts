
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Generate each FAQ item with all styles inlined directly in the HTML elements
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => {
        // Determine if this is the last item for special styling
        const isLastItem = index === block.questions.length - 1;
        const itemBottomStyle = isLastItem ? 'margin-bottom:0;border-bottom:none;' : 'margin-bottom:10px;border-bottom:1px solid #eaeaea;';
        
        return `
          <div class="faq-item" style="${itemBottomStyle}overflow:hidden;">
            <input type="checkbox" id="faq-${block.id}-${index}" class="faq-toggle" style="display:none;">
            <label for="faq-${block.id}-${index}" class="faq-question" style="padding:16px 0;font-weight:500;cursor:pointer;position:relative;display:block;color:#333;">
              ${item.question}
              <span class="faq-icon" style="position:absolute;right:8px;top:16px;font-size:22px;transition:transform 0.3s ease;font-weight:300;color:#c9a154;">+</span>
            </label>
            <div class="faq-answer" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;">
              <div class="faq-answer-content" style="padding:0 0 16px 0;color:#666;">${item.answer}</div>
            </div>
            <style>
              #faq-${block.id}-${index}:checked ~ .faq-answer {
                max-height: 1000px;
              }
              #faq-${block.id}-${index}:checked + label .faq-icon {
                transform: rotate(45deg);
              }
              label[for="faq-${block.id}-${index}"]:hover {
                color: #000;
              }
            </style>
          </div>
        `;
      }).join('')
    : '';
  
  // HTML completo com todas as tags devidamente fechadas e estilos inline
  return `
    <div id="faq-block-${block.id}"${blockStyleAttr} style="width:100%;padding:20px 0;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;color:#333;">${block.heading}</h2>
      <div class="faq-items" style="border-radius:4px;background-color:#fff;">
        ${faqHtml}
      </div>
    </div>
  `;
};
