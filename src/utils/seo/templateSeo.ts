import { Block } from '@/types/editor';

export const extractTextFromBlocks = (blocks: Block[]): string => {
  let text = '';
  
  blocks.forEach(block => {
    switch (block.type) {
      case 'text':
        text += (block as any).heading + ' ' + (block as any).content + ' ';
        break;
      case 'hero':
        text += (block as any).heading + ' ' + (block as any).subheading + ' ';
        break;
      case 'features':
        text += (block as any).heading + ' ';
        if ((block as any).features) {
          (block as any).features.forEach((feature: any) => {
            text += feature.title + ' ' + feature.description + ' ';
          });
        }
        break;
      case 'benefits':
        text += (block as any).heading + ' ';
        if ((block as any).benefits) {
          (block as any).benefits.forEach((benefit: any) => {
            text += benefit.title + ' ' + benefit.description + ' ';
          });
        }
        break;
      case 'specifications':
        text += (block as any).heading + ' ';
        if ((block as any).specs) {
          (block as any).specs.forEach((spec: any) => {
            text += spec.name + ' ' + spec.value + ' ';
          });
        }
        break;
      case 'faq':
        text += (block as any).heading + ' ';
        if ((block as any).questions) {
          (block as any).questions.forEach((q: any) => {
            text += q.question + ' ' + q.answer + ' ';
          });
        }
        break;
      case 'cta':
        text += (block as any).heading + ' ' + (block as any).content + ' ';
        break;
      case 'imageText':
      case 'textImage':
        text += (block as any).heading + ' ' + (block as any).content + ' ';
        break;
    }
  });
  
  return text.trim();
};

export const calculateWordCount = (text: string): number => {
  return text.split(/\s+/).filter(word => word.length > 0).length;
};

export const calculateKeywordDensity = (text: string, keyword: string): number => {
  if (!keyword || !text) return 0;
  
  const words = text.toLowerCase().split(/\s+/);
  const keywordLower = keyword.toLowerCase();
  const keywordCount = words.filter(word => word.includes(keywordLower)).length;
  
  return words.length > 0 ? (keywordCount / words.length) * 100 : 0;
};

export const analyzeHeadingHierarchy = (blocks: Block[]) => {
  const headings: string[] = [];
  let hasH1 = false;
  const issues: string[] = [];
  
  blocks.forEach((block, index) => {
    if (block.type === 'hero' || block.type === 'text') {
      const heading = (block as any).heading;
      if (heading) {
        // First heading should be H1
        if (index === 0 || block.type === 'hero') {
          headings.push('H1');
          hasH1 = true;
        } else {
          headings.push('H2');
        }
      }
    }
  });
  
  if (!hasH1 && headings.length > 0) {
    issues.push('Nenhum H1 encontrado. O primeiro título deve ser H1.');
  }
  
  return {
    hasH1,
    hierarchy: headings,
    issues
  };
};

export const checkImageAltTexts = (blocks: Block[]) => {
  let totalImages = 0;
  let imagesWithAlt = 0;
  const missingAlt: string[] = [];
  
  blocks.forEach(block => {
    if (block.type === 'image') {
      totalImages++;
      const alt = (block as any).alt;
      if (alt && alt.trim()) {
        imagesWithAlt++;
      } else {
        missingAlt.push(`Imagem em bloco ${block.title || block.type}`);
      }
    } else if (block.type === 'gallery') {
      const images = (block as any).images || [];
      images.forEach((img: any, index: number) => {
        totalImages++;
        if (img.alt && img.alt.trim()) {
          imagesWithAlt++;
        } else {
          missingAlt.push(`Imagem ${index + 1} na galeria ${block.title || block.type}`);
        }
      });
    } else if (block.type === 'imageText' || block.type === 'textImage') {
      totalImages++;
      const alt = (block as any).image?.alt;
      if (alt && alt.trim()) {
        imagesWithAlt++;
      } else {
        missingAlt.push(`Imagem em bloco ${block.title || block.type}`);
      }
    }
  });
  
  return {
    totalImages,
    imagesWithAlt,
    missingAlt
  };
};

export const findCTABlocks = (blocks: Block[]) => {
  const ctaBlocks = blocks.filter(block => 
    block.type === 'cta' || 
    (block.type === 'hero' && (block as any).buttonText)
  );
  
  return {
    hasCTA: ctaBlocks.length > 0,
    ctaCount: ctaBlocks.length
  };
};

export const generateSEOScore = (analysis: {
  wordCount: number;
  keywordDensity: number;
  headingAnalysis: any;
  imageAnalysis: any;
  ctaAnalysis: any;
  hasKeyword: boolean;
}): number => {
  let score = 0;
  
  // Word count (max 25 points)
  if (analysis.wordCount >= 300) score += 25;
  else if (analysis.wordCount >= 150) score += 15;
  else if (analysis.wordCount >= 50) score += 10;
  
  // Keyword density (max 20 points)
  if (analysis.hasKeyword) {
    if (analysis.keywordDensity >= 1 && analysis.keywordDensity <= 3) score += 20;
    else if (analysis.keywordDensity > 0 && analysis.keywordDensity < 5) score += 10;
  }
  
  // Heading structure (max 20 points)
  if (analysis.headingAnalysis.hasH1) score += 20;
  else if (analysis.headingAnalysis.hierarchy.length > 0) score += 10;
  
  // Image alt texts (max 20 points)
  if (analysis.imageAnalysis.totalImages > 0) {
    const altRatio = analysis.imageAnalysis.imagesWithAlt / analysis.imageAnalysis.totalImages;
    score += Math.round(altRatio * 20);
  } else {
    score += 10; // No penalty for no images
  }
  
  // CTA presence (max 15 points)
  if (analysis.ctaAnalysis.hasCTA) score += 15;
  
  return Math.min(score, 100);
};

export const generateRecommendations = (analysis: {
  wordCount: number;
  keywordDensity: number;
  headingAnalysis: any;
  imageAnalysis: any;
  ctaAnalysis: any;
  keyword?: string;
}) => {
  const recommendations: Array<{
    type: 'success' | 'warning' | 'error';
    message: string;
    action?: string;
  }> = [];
  
  // Word count recommendations
  if (analysis.wordCount < 50) {
    recommendations.push({
      type: 'error',
      message: 'Conteúdo muito curto. Adicione mais texto aos blocos.',
      action: 'add_content'
    });
  } else if (analysis.wordCount < 150) {
    recommendations.push({
      type: 'warning',
      message: 'Conteúdo um pouco curto. Considere adicionar mais detalhes.'
    });
  } else {
    recommendations.push({
      type: 'success',
      message: 'Boa quantidade de conteúdo para SEO.'
    });
  }
  
  // Keyword density recommendations
  if (analysis.keyword) {
    if (analysis.keywordDensity === 0) {
      recommendations.push({
        type: 'error',
        message: `A palavra-chave "${analysis.keyword}" não foi encontrada no conteúdo.`,
        action: 'add_keyword'
      });
    } else if (analysis.keywordDensity > 5) {
      recommendations.push({
        type: 'warning',
        message: 'Densidade de palavra-chave muito alta. Pode parecer spam.'
      });
    } else if (analysis.keywordDensity >= 1 && analysis.keywordDensity <= 3) {
      recommendations.push({
        type: 'success',
        message: 'Densidade de palavra-chave ideal.'
      });
    }
  }
  
  // Heading recommendations
  if (!analysis.headingAnalysis.hasH1) {
    recommendations.push({
      type: 'error',
      message: 'Nenhum título H1 encontrado. Defina o primeiro título como H1.',
      action: 'set_h1'
    });
  } else {
    recommendations.push({
      type: 'success',
      message: 'Estrutura de títulos adequada.'
    });
  }
  
  // Image alt text recommendations
  if (analysis.imageAnalysis.missingAlt.length > 0) {
    recommendations.push({
      type: 'warning',
      message: `${analysis.imageAnalysis.missingAlt.length} imagem(ns) sem texto alternativo.`,
      action: 'add_alt_text'
    });
  } else if (analysis.imageAnalysis.totalImages > 0) {
    recommendations.push({
      type: 'success',
      message: 'Todas as imagens possuem texto alternativo.'
    });
  }
  
  // CTA recommendations
  if (!analysis.ctaAnalysis.hasCTA) {
    recommendations.push({
      type: 'warning',
      message: 'Nenhum Call-to-Action encontrado. Adicione um CTA para melhor conversão.',
      action: 'add_cta'
    });
  } else {
    recommendations.push({
      type: 'success',
      message: 'Call-to-Action presente no template.'
    });
  }
  
  return recommendations;
};