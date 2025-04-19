
export const cleanupHtml = (html: string): string => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  
  // Remove scripts, iframes e outros elementos potencialmente perigosos
  const dangerous = tempElement.querySelectorAll('script, iframe, object, embed, style');
  dangerous.forEach(el => el.remove());
  
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
  
  // Remove classes e estilos inline que podem interferir com nosso layout
  const elements = tempElement.querySelectorAll('*');
  elements.forEach(el => {
    if (el.tagName !== 'IMG') {
      el.removeAttribute('style');
      el.removeAttribute('class');
    }
  });
  
  return tempElement.innerHTML;
};
