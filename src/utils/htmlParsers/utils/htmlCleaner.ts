
export const cleanupHtml = (html: string): string => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  
  // Remove scripts, iframes e outros elementos potencialmente perigosos
  const dangerous = tempElement.querySelectorAll('script, iframe, object, embed, style');
  dangerous.forEach(el => el.remove());
  
  // Remove elementos específicos que podem causar problemas
  const checkNodes = tempElement.querySelectorAll('*');
  checkNodes.forEach(el => {
    // Remove elementos que contêm apenas a palavra "check"
    if (el.childNodes.length === 1 && 
        el.childNodes[0].nodeType === Node.TEXT_NODE && 
        el.textContent?.trim() === 'check') {
      el.remove();
    }

    // Remove atributos desnecessários de todos os elementos
    if (el.attributes && el.attributes.length) {
      const safeAttrs = ['src', 'href', 'alt', 'title', 'id'];
      Array.from(el.attributes).forEach(attr => {
        if (!safeAttrs.includes(attr.name) && !attr.name.startsWith('data-')) {
          el.removeAttribute(attr.name);
        }
      });
    }
  });
  
  // Limpa ocorrências da palavra "check" no início de linhas ou nós de texto
  const textNodes = getTextNodes(tempElement);
  textNodes.forEach(node => {
    if (node.textContent) {
      node.textContent = node.textContent.replace(/^check\s+/g, '').replace(/\n\s*check\s+/g, '\n');
    }
  });
  
  // Mantém apenas os atributos essenciais em imagens
  const images = tempElement.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';
    img.removeAttribute('style');
    img.removeAttribute('class');
    img.setAttribute('src', src || '');
    img.setAttribute('alt', alt);
  });
  
  return tempElement.innerHTML;
};

// Função auxiliar para obter todos os nós de texto em um elemento
const getTextNodes = (element: Element): Text[] => {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  
  let node = walker.nextNode();
  while (node) {
    textNodes.push(node as Text);
    node = walker.nextNode();
  }
  
  return textNodes;
};
