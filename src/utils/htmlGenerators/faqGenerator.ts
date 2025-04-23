
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
          <div class="faq-item" style="${itemBottomStyle}border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;margin-bottom:16px;">
            <div class="faq-question" 
                 onclick="toggleFAQ('faq-${block.id}-${index}')"
                 style="padding:12px 16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:block;">
              ${item.question}
              <span id="faq-icon-${block.id}-${index}" style="position:absolute;right:16px;top:12px;font-size:18px;transition:transform 0.3s ease;">+</span>
            </div>
            <div id="faq-${block.id}-${index}" class="faq-answer" style="max-height:0;overflow:hidden;background-color:white;transition:max-height 0.3s ease;padding:0 16px;">
              <div style="padding:16px 0;">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // JavaScript to handle the FAQ toggle behavior inline
  const faqScript = `
    <script>
      function toggleFAQ(id) {
        var answer = document.getElementById(id);
        var icon = document.getElementById('faq-icon-' + id);
        
        if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
          answer.style.maxHeight = '1000px';
          answer.style.padding = '0 16px';
          if (icon) icon.style.transform = 'rotate(45deg)';
        } else {
          answer.style.maxHeight = '0px';
          answer.style.padding = '0 16px';
          if (icon) icon.style.transform = 'rotate(0)';
        }
      }
    </script>
  `;
  
  // Complete FAQ block HTML with all styles inlined
  return `
    <div id="faq-block-${block.id}"${blockStyleAttr} style="width:100%;padding:20px 0;margin-bottom:20px;">
      <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;">${block.heading}</h2>
      <div style="border-radius:4px;">
        ${faqHtml}
      </div>
      ${faqScript}
    </div>
  `;
};
