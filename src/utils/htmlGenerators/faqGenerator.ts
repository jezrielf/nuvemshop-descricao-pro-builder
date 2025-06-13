
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
          <div class="faq-item" style="${itemBottomStyle}border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
            <div class="faq-question" 
                 onclick="toggleFAQ('faq-${block.id}-${index}', 'faq-icon-${block.id}-${index}')"
                 style="padding:12px 16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:block;user-select:none;">
              ${item.question}
              <span class="faq-icon" id="faq-icon-${block.id}-${index}" style="position:absolute;right:16px;top:12px;font-size:18px;transition:transform 0.3s ease;transform:rotate(0deg);">+</span>
            </div>
            <div id="faq-${block.id}-${index}" class="faq-answer" style="max-height:0;overflow:hidden;background-color:white;transition:max-height 0.3s ease;padding:0 16px;">
              <div style="padding:16px 0;">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // Simplified JavaScript with global function for better compatibility with Preview
  const faqScript = `
    <script>
      // Global function to handle FAQ toggle
      window.toggleFAQ = function(answerId, iconId) {
        var answerElement = document.getElementById(answerId);
        var iconElement = document.getElementById(iconId);
        
        if (answerElement && iconElement) {
          var isOpen = answerElement.style.maxHeight && answerElement.style.maxHeight !== '0px';
          
          if (isOpen) {
            // Close the FAQ
            answerElement.style.maxHeight = '0px';
            iconElement.style.transform = 'rotate(0deg)';
            iconElement.textContent = '+';
          } else {
            // Open the FAQ - use scrollHeight for proper animation
            answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
            iconElement.style.transform = 'rotate(45deg)';
            iconElement.textContent = '×';
          }
        }
      };
      
      // Initialize FAQ block when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          console.log('FAQ Block ${block.id} initialized');
        });
      } else {
        console.log('FAQ Block ${block.id} initialized immediately');
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
