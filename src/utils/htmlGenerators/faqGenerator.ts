
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
          <div style="${itemBottomStyle}border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
            <details class="faq-item">
              <summary style="padding:12px 16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:flex;justify-content:space-between;align-items:center;list-style:none;">
                ${item.question}
                <span style="font-size:18px;">+</span>
              </summary>
              <div style="padding:16px;background-color:white;">
                ${item.answer}
              </div>
            </details>
          </div>
        `;
      }).join('')
    : '';
  
  // Additional CSS to style the details/summary elements
  const faqStyle = `
    <style>
      .faq-item summary::-webkit-details-marker {
        display: none;
      }
      .faq-item[open] summary span {
        transform: rotate(45deg);
      }
      .faq-item summary span {
        transition: transform 0.3s ease;
      }
    </style>
  `;
  
  // Complete FAQ block HTML with all styles inlined
  return `
    <div id="faq-block-${block.id}"${blockStyleAttr} style="width:100%;padding:20px 0;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div style="border-radius:4px;">
        ${faqHtml}
      </div>
      ${faqStyle}
    </div>
  `;
};
