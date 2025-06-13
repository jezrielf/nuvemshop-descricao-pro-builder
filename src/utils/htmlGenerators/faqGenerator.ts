
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Generate each FAQ item with CSS-only accordion functionality
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => {
        const isLastItem = index === block.questions.length - 1;
        const itemBottomStyle = isLastItem ? 'margin-bottom:0;' : 'margin-bottom:16px;';
        const uniqueId = `faq-${block.id}-${index}`;
        
        return `
          <div class="faq-item" style="${itemBottomStyle}border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <input type="checkbox" id="${uniqueId}" class="faq-checkbox" style="display:none;">
            <label for="${uniqueId}" class="faq-question" style="padding:16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:block;user-select:none;border:none;width:100%;text-align:left;">
              ${item.question}
              <span class="faq-icon" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:18px;transition:transform 0.3s ease;">+</span>
            </label>
            <div class="faq-answer" style="max-height:0;overflow:hidden;background-color:white;transition:max-height 0.3s ease;padding:0 16px;">
              <div style="padding:16px 0;">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // CSS for accordion functionality using :checked pseudo-class
  const faqStyles = `
    <style>
      /* FAQ accordion styles */
      .faq-checkbox:checked ~ .faq-question .faq-icon {
        transform: translateY(-50%) rotate(45deg);
      }
      
      .faq-checkbox:checked ~ .faq-answer {
        max-height: 1000px;
        transition: max-height 0.4s ease-in;
      }
      
      .faq-question:hover {
        background-color: #f3f4f6 !important;
      }
      
      /* Smooth animations */
      .faq-answer {
        transition: max-height 0.4s ease-out;
      }
      
      .faq-icon {
        transition: transform 0.3s ease;
      }
    </style>
  `;
  
  // Complete FAQ block HTML with CSS-only accordion
  return `
    ${faqStyles}
    <div id="faq-block-${block.id}"${blockStyleAttr} style="width:100%;padding:20px 0;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div style="border-radius:4px;">
        ${faqHtml}
      </div>
    </div>
  `;
};
