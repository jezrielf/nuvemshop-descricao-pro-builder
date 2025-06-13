
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
                 data-faq-id="faq-${block.id}-${index}"
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
  
  // JavaScript to handle the FAQ toggle behavior with proper event handling
  const faqScript = `
    <script>
      (function() {
        function initializeFAQ() {
          // Find all FAQ questions in this specific block
          var faqQuestions = document.querySelectorAll('[data-faq-id^="faq-${block.id}"]');
          
          faqQuestions.forEach(function(questionElement) {
            // Remove any existing event listeners to prevent duplicates
            var newElement = questionElement.cloneNode(true);
            questionElement.parentNode.replaceChild(newElement, questionElement);
            
            // Add click event listener to the new element
            newElement.addEventListener('click', function() {
              var faqId = this.getAttribute('data-faq-id');
              var answerElement = document.getElementById(faqId);
              var iconElement = document.getElementById(faqId.replace('faq-', 'faq-icon-'));
              
              if (answerElement && iconElement) {
                var isOpen = answerElement.style.maxHeight && answerElement.style.maxHeight !== '0px';
                
                if (isOpen) {
                  // Close the FAQ
                  answerElement.style.maxHeight = '0px';
                  iconElement.style.transform = 'rotate(0deg)';
                  iconElement.textContent = '+';
                } else {
                  // Open the FAQ
                  answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
                  iconElement.style.transform = 'rotate(45deg)';
                  iconElement.textContent = '×';
                }
              }
            });
          });
        }
        
        // Initialize immediately if DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initializeFAQ);
        } else {
          initializeFAQ();
        }
        
        // Also initialize after a short delay to handle dynamic content
        setTimeout(initializeFAQ, 100);
      })();
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
