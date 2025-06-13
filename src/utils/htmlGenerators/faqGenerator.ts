
import { FAQBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateFAQHtml = (block: FAQBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Generate each FAQ item with unique IDs and data attributes
  const faqHtml = block.questions && block.questions.length > 0 
    ? block.questions.map((item, index) => {
        // Determine if this is the last item for special styling
        const isLastItem = index === block.questions.length - 1;
        const itemBottomStyle = isLastItem ? 'margin-bottom:0;' : 'margin-bottom:16px;';
        const uniqueId = `faq-${block.id}-${index}`;
        const iconId = `faq-icon-${block.id}-${index}`;
        
        return `
          <div class="faq-item" style="${itemBottomStyle}border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
            <div class="faq-question" 
                 data-faq-answer="${uniqueId}"
                 data-faq-icon="${iconId}"
                 style="padding:12px 16px;background-color:#f9fafb;font-weight:500;cursor:pointer;position:relative;display:block;user-select:none;">
              ${item.question}
              <span class="faq-icon" id="${iconId}" style="position:absolute;right:16px;top:12px;font-size:18px;transition:transform 0.3s ease;transform:rotate(0deg);">+</span>
            </div>
            <div id="${uniqueId}" class="faq-answer" style="max-height:0;overflow:hidden;background-color:white;transition:max-height 0.3s ease;padding:0 16px;">
              <div style="padding:16px 0;">${item.answer}</div>
            </div>
          </div>
        `;
      }).join('')
    : '';
  
  // JavaScript que funciona com dangerouslySetInnerHTML no Preview
  const faqScript = `
    <script>
      (function() {
        function attachFAQListeners() {
          // Encontrar todas as perguntas FAQ deste bloco específico
          var questions = document.querySelectorAll('[data-faq-answer^="faq-${block.id}"]');
          
          questions.forEach(function(questionElement) {
            // Remover listeners existentes clonando o elemento
            var newQuestion = questionElement.cloneNode(true);
            questionElement.parentNode.replaceChild(newQuestion, questionElement);
            
            // Adicionar novo listener
            newQuestion.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              var answerId = this.getAttribute('data-faq-answer');
              var iconId = this.getAttribute('data-faq-icon');
              var answerElement = document.getElementById(answerId);
              var iconElement = document.getElementById(iconId);
              
              if (answerElement && iconElement) {
                var isOpen = answerElement.style.maxHeight && answerElement.style.maxHeight !== '0px';
                
                if (isOpen) {
                  // Fechar FAQ
                  answerElement.style.maxHeight = '0px';
                  iconElement.style.transform = 'rotate(0deg)';
                  iconElement.textContent = '+';
                } else {
                  // Abrir FAQ - usar scrollHeight para animação correta
                  answerElement.style.maxHeight = answerElement.scrollHeight + 'px';
                  iconElement.style.transform = 'rotate(45deg)';
                  iconElement.textContent = '×';
                }
              }
            });
          });
        }
        
        // Executar imediatamente se DOM estiver pronto
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', attachFAQListeners);
        } else {
          attachFAQListeners();
        }
        
        // Executar novamente após delay para conteúdo dinâmico
        setTimeout(attachFAQListeners, 200);
        
        // Executar quando a janela carregar completamente
        window.addEventListener('load', attachFAQListeners);
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
