
export function sanitizeHtmlContent(html: string): string {
  if (!html) return '';
  
  try {
    // Create a temporary element to clean up the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Remove script tags
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Remove style tags
    const styles = tempDiv.querySelectorAll('style');
    styles.forEach(style => style.remove());
    
    // Remove comments
    const nodeIterator = document.createNodeIterator(
      tempDiv,
      NodeFilter.SHOW_COMMENT,
      null
    );
    let currentNode;
    while (currentNode = nodeIterator.nextNode()) {
      currentNode.parentNode?.removeChild(currentNode);
    }
    
    // Clean up whitespace
    let cleanedHtml = tempDiv.innerHTML
      .replace(/(\r\n|\n|\r)/gm, ' ') // Replace line breaks with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single spaces
      .trim();
    
    return cleanedHtml;
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return html; // Return original HTML if an error occurs
  }
}
