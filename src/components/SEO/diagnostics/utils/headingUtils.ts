
import { HeadingStructure, HeadingSuggestion } from '../types/headingTypes';

// Calculate a score for heading structure quality (0-100)
export function calculateHeadingScore(headingStructure: HeadingStructure, hasProductTitle: boolean = false): number {
  let score = 0;
  
  // Base score - 20 points
  score += 20;
  
  // Has H1 - 20 points (considerando título do produto)
  if (headingStructure.hasValidH1 || hasProductTitle) score += 20;
  
  // Proper hierarchy - 15 points
  if (headingStructure.hasProperHierarchy) score += 15;
  
  // Only one H1 - 15 points
  const h1Count = headingStructure.headings.filter(h => h.level === 1).length;
  if (h1Count <= 1) score += 15; // <= 1 porque pode não ter nenhum (usará o título do produto)
  
  // Heading count (2-3: 5 points, 4-6: 10 points, 7+: 15 points)
  if (headingStructure.count >= 2 && headingStructure.count <= 3) score += 5;
  else if (headingStructure.count >= 4 && headingStructure.count <= 6) score += 10;
  else if (headingStructure.count >= 7) score += 15;
  
  // H1 contains keywords - 15 points
  const h1 = headingStructure.headings.find(h => h.level === 1);
  if ((h1 && headingStructure.topKeywords.some(kw => h1.text.toLowerCase().includes(kw))) ||
      (hasProductTitle)) {
    score += 15;
  }
  
  return Math.min(score, 100);
}

// Generate specific improvement suggestions
export function getImprovementSuggestions(
  headingStructure: HeadingStructure, 
  productTitle?: string
): string[] {
  const suggestions: string[] = [];
  
  const h1s = headingStructure.headings.filter(h => h.level === 1);
  
  // Check if H1 exists
  if (!headingStructure.hasValidH1 && !productTitle) {
    suggestions.push("Adicione uma tag H1 que contenha a palavra-chave principal e descreva claramente o conteúdo.");
  }
  
  // Check if there are multiple H1s
  if (h1s.length > 1) {
    suggestions.push(`Mantenha apenas um H1 por página. Atualmente existem ${h1s.length} tags H1.`);
  }
  
  // Se há um produto, mas não menciona eso em nenhum cabeçalho 
  if (productTitle && !headingStructure.headings.some(h => 
    h.text.toLowerCase().includes(productTitle.toLowerCase().substring(0, 10))
  )) {
    suggestions.push(`Inclua o nome do produto "${productTitle}" em pelo menos um dos cabeçalhos secundários (H2-H4).`);
  }
  
  // Check hierarchy issues
  if (!headingStructure.hasProperHierarchy) {
    suggestions.push("Corrija a hierarquia de cabeçalhos para seguir uma ordem lógica sem saltos (ex: não pule de H1 para H3).");
  }
  
  // Check keywords in H1
  const h1 = h1s.length === 1 ? h1s[0] : null;
  if (h1 && !headingStructure.topKeywords.some(kw => h1.text.toLowerCase().includes(kw))) {
    suggestions.push("Inclua ao menos uma palavra-chave relevante no cabeçalho H1.");
  }
  
  // Check heading count
  if (headingStructure.count < 2) {
    suggestions.push("Adicione mais cabeçalhos (H2, H3) para estruturar melhor o conteúdo e ajudar no SEO.");
  }
  
  // Check if there are H2 headings
  if (!headingStructure.headings.some(h => h.level === 2)) {
    suggestions.push("Adicione cabeçalhos H2 para criar seções principais dentro do conteúdo.");
  }
  
  // Check length of heading text
  const longHeadings = headingStructure.headings.filter(h => h.text.length > 60);
  if (longHeadings.length > 0) {
    suggestions.push("Reduza o tamanho de cabeçalhos muito longos para manter a concisão e o foco.");
  }
  
  return suggestions;
}

// Generate heading suggestions based on content
export function generateHeadingSuggestions(
  headingStructure: HeadingStructure, 
  currentProductTitle?: string
): HeadingSuggestion[] {
  // Start with current headings or create a basic structure
  let suggestions = [...headingStructure.headings].map(h => ({
    level: h.level,
    text: h.text,
    original: h.text
  }));
  
  // Remove any existing H1 from suggestions if we have a product title
  if (currentProductTitle) {
    suggestions = suggestions.filter(h => h.level !== 1);
  }
  
  // Generate better H2-H4 based on the content and keywords
  const availableKeywords = [...headingStructure.topKeywords];
  
  // Make sure we have at least one H2
  if (!suggestions.some(h => h.level === 2)) {
    const keyword = availableKeywords.shift();
    if (keyword) {
      suggestions.push({ 
        level: 2, 
        text: `Principais características ${keyword ? `relacionadas a ${keyword}` : ''}`,
        original: '' // Added this property
      });
    } else {
      suggestions.push({ 
        level: 2, 
        text: 'Características principais',
        original: '' // Added this property
      });
    }
  }
  
  // Add H3 if needed
  if (!suggestions.some(h => h.level === 3)) {
    const keyword = availableKeywords.shift();
    if (keyword) {
      suggestions.push({ 
        level: 3, 
        text: `Benefícios ${keyword ? `do ${keyword}` : 'do produto'}`,
        original: '' // Added this property 
      });
    }
  }
  
  // Sort headings by level for proper hierarchy
  suggestions = suggestions.sort((a, b) => a.level - b.level);
  
  return suggestions;
}
