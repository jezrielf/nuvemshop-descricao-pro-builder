
import { useMemo } from 'react';
import { ProductDescription } from '@/types/editor';
import { SEOCheckItem } from '../types';
import { 
  countHeadings, 
  checkImagesAlt, 
  getContentLength 
} from '../../utils/contentUtils';

export const useSEOChecks = (description: ProductDescription | null) => {
  const checks = useMemo(() => {
    if (!description) return [];
    
    const checksList: SEOCheckItem[] = [];
    
    // Content checks
    checksList.push({
      id: 'content-length',
      title: 'Comprimento do conteúdo',
      description: getContentLength(description) > 300 
        ? 'Bom comprimento de conteúdo (superior a 300 palavras)' 
        : 'Conteúdo muito curto (menos de 300 palavras)',
      status: getContentLength(description) > 300 ? 'pass' : 'fail',
      category: 'content',
      suggestion: getContentLength(description) <= 300 ? 'Adicione mais conteúdo descritivo para melhorar o SEO. Recomendamos pelo menos 300 palavras.' : undefined
    });
    
    checksList.push({
      id: 'content-headings',
      title: 'Uso de cabeçalhos',
      description: countHeadings(description) > 3 
        ? 'Bom uso de cabeçalhos para estruturar o conteúdo' 
        : 'Poucos cabeçalhos. Considere adicionar mais para melhorar a estrutura',
      status: countHeadings(description) > 3 ? 'pass' : 'warning',
      category: 'content',
      suggestion: countHeadings(description) <= 3 ? 'Adicione mais cabeçalhos (H1, H2, H3) para estruturar melhor seu conteúdo.' : undefined
    });
    
    // Image checks
    const hasImages = description.blocks.some(block => 
      ['image', 'gallery', 'hero', 'imageText', 'textImage'].includes(block.type)
    );
    
    checksList.push({
      id: 'images-present',
      title: 'Presença de imagens',
      description: hasImages 
        ? 'A descrição contém imagens, o que é ótimo para SEO' 
        : 'Nenhuma imagem encontrada. Imagens melhoram o engajamento e SEO',
      status: hasImages ? 'pass' : 'fail',
      category: 'images',
      suggestion: !hasImages ? 'Adicione pelo menos uma imagem relevante ao produto para melhorar o engajamento.' : undefined
    });
    
    const allImagesHaveAlt = checkImagesAlt(description);
    checksList.push({
      id: 'images-alt',
      title: 'Textos alternativos',
      description: allImagesHaveAlt 
        ? 'Todas as imagens possuem textos alternativos (alt)' 
        : 'Algumas imagens não possuem texto alternativo (alt)',
      status: allImagesHaveAlt ? 'pass' : 'warning',
      category: 'images',
      suggestion: !allImagesHaveAlt ? 'Adicione texto alternativo (alt) a todas as imagens para melhorar a acessibilidade e SEO.' : undefined
    });
    
    // Structure checks
    checksList.push({
      id: 'structure-cta',
      title: 'Chamada para ação',
      description: description.blocks.some(block => block.type === 'cta') 
        ? 'Contém chamada para ação, excelente para conversão' 
        : 'Nenhuma chamada para ação encontrada',
      status: description.blocks.some(block => block.type === 'cta') ? 'pass' : 'warning',
      category: 'structure',
      suggestion: !description.blocks.some(block => block.type === 'cta') ? 'Adicione um bloco de CTA (Chamada para Ação) para melhorar as taxas de conversão.' : undefined
    });
    
    checksList.push({
      id: 'structure-faq',
      title: 'Perguntas frequentes',
      description: description.blocks.some(block => block.type === 'faq') 
        ? 'Contém seção de FAQ, excelente para SEO e rich snippets' 
        : 'Nenhuma seção de FAQ encontrada',
      status: description.blocks.some(block => block.type === 'faq') ? 'pass' : 'warning',
      category: 'structure',
      suggestion: !description.blocks.some(block => block.type === 'faq') ? 'Adicione uma seção de FAQ para melhorar a experiência do usuário e criar oportunidades para rich snippets.' : undefined
    });
    
    // Calculate score
    const totalChecks = checksList.length;
    const passedChecks = checksList.filter(check => check.status === 'pass').length;
    const percentage = Math.round((passedChecks / totalChecks) * 100);
    
    // Add overall score
    checksList.unshift({
      id: 'overall-score',
      title: `Score geral: ${percentage}%`,
      description: `${passedChecks} de ${totalChecks} verificações passaram`,
      status: percentage >= 80 ? 'pass' : percentage >= 60 ? 'warning' : 'fail',
      category: 'content'
    });
    
    return checksList;
  }, [description]);

  return { 
    checks, 
    scoreItem: checks.length > 0 ? checks[0] : null 
  };
};
