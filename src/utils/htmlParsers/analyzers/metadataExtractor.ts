
export interface SectionMetadata {
  type: string;
  confidence: number;
}

export function extractMetadataFromElement(element: Element): SectionMetadata | null {
  // Try to identify the section type based on class names, IDs, and content
  const classNames = element.className.split(' ');
  const elementId = element.id;
  const innerText = element.textContent || '';
  
  // Create a scoring system for different section types
  const typeScores: Record<string, number> = {
    hero: 0,
    text: 0,
    features: 0,
    benefits: 0,
    specifications: 0,
    image: 0,
    gallery: 0,
    imageText: 0,
    textImage: 0,
    faq: 0,
    cta: 0,
    video: 0
  };
  
  // Score based on class names
  classNames.forEach(className => {
    const cl = className.toLowerCase();
    
    // Check for explicit types in class names
    if (cl.includes('hero') || cl.includes('banner')) typeScores.hero += 30;
    if (cl.includes('text') || cl.includes('content')) typeScores.text += 20;
    if (cl.includes('feature')) typeScores.features += 30;
    if (cl.includes('benefit')) typeScores.benefits += 30;
    if (cl.includes('spec')) typeScores.specifications += 30;
    if (cl.includes('image') && !cl.includes('text')) typeScores.image += 20;
    if (cl.includes('gallery') || cl.includes('carousel')) typeScores.gallery += 30;
    if ((cl.includes('image') && cl.includes('text')) || cl.includes('media-text')) typeScores.imageText += 30;
    if (cl.includes('faq') || cl.includes('question') || cl.includes('accordion')) typeScores.faq += 30;
    if (cl.includes('cta') || cl.includes('call-to-action')) typeScores.cta += 30;
    if (cl.includes('video')) typeScores.video += 30;
  });
  
  // Score based on element ID
  if (elementId) {
    const id = elementId.toLowerCase();
    if (id.includes('hero') || id.includes('banner')) typeScores.hero += 20;
    if (id.includes('text') || id.includes('content')) typeScores.text += 15;
    if (id.includes('feature')) typeScores.features += 20;
    if (id.includes('benefit')) typeScores.benefits += 20;
    if (id.includes('spec')) typeScores.specifications += 20;
    if (id.includes('image') && !id.includes('text')) typeScores.image += 15;
    if (id.includes('gallery') || id.includes('carousel')) typeScores.gallery += 20;
    if ((id.includes('image') && id.includes('text')) || id.includes('media-text')) typeScores.imageText += 20;
    if (id.includes('faq') || id.includes('question') || id.includes('accordion')) typeScores.faq += 20;
    if (id.includes('cta') || id.includes('call-to-action')) typeScores.cta += 20;
    if (id.includes('video')) typeScores.video += 20;
  }
  
  // Score based on content elements
  if (element.querySelector('h1, h2.hero')) typeScores.hero += 15;
  if (element.querySelectorAll('p').length > 2) typeScores.text += 10;
  if (element.querySelectorAll('li, .feature, .features').length > 2) typeScores.features += 15;
  if (element.querySelectorAll('.benefit, .benefits').length > 0) typeScores.benefits += 15;
  if (element.querySelectorAll('table, .specification, dl').length > 0) typeScores.specifications += 15;
  
  const images = element.querySelectorAll('img');
  if (images.length === 1 && element.querySelectorAll('p').length < 2) typeScores.image += 15;
  if (images.length > 2) typeScores.gallery += 20;
  if (images.length === 1 && element.querySelectorAll('p').length >= 2) typeScores.imageText += 15;
  
  if (element.querySelectorAll('details, summary, .question, .answer').length > 0) typeScores.faq += 15;
  if (element.querySelectorAll('a.button, button, .btn').length > 0 && innerText.length < 300) typeScores.cta += 15;
  if (element.querySelector('video, iframe[src*="youtube"], iframe[src*="vimeo"]')) typeScores.video += 25;
  
  // Find the highest scoring type
  let highestScore = 0;
  let highestType = 'text'; // Default to text
  
  Object.entries(typeScores).forEach(([type, score]) => {
    if (score > highestScore) {
      highestScore = score;
      highestType = type;
    }
  });
  
  // Only return a result if the confidence is above a threshold
  return highestScore > 10 ? {
    type: highestType,
    confidence: highestScore
  } : null;
}
