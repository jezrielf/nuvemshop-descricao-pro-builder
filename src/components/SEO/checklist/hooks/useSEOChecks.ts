
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
      category: 'content'
    });
    
    checksList.push({
      id: 'content-headings',
      title: 'Uso de cabeçalhos',
      description: countHeadings(description) > 3 
        ? 'Bom uso de cabeçalhos para estruturar o conteúdo' 
        : 'Poucos cabeçalhos. Considere adicionar mais para melhorar a estrutura',
      status: countHeadings(description) > 3 ? 'pass' : 'warning',
      category: 'content'
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
      category: 'images'
    });
    
    const allImagesHaveAlt = checkImagesAlt(description);
    checksList.push({
      id: 'images-alt',
      title: 'Textos alternativos',
      description: allImagesHaveAlt 
        ? 'Todas as imagens possuem textos alternativos (alt)' 
        : 'Algumas imagens não possuem texto alternativo (alt)',
      status: allImagesHaveAlt ? 'pass' : 'warning',
      category: 'images'
    });
    
    // Structure checks
    checksList.push({
      id: 'structure-cta',
      title: 'Chamada para ação',
      description: description.blocks.some(block => block.type === 'cta') 
        ? 'Contém chamada para ação, excelente para conversão' 
        : 'Nenhuma chamada para ação encontrada',
      status: description.blocks.some(block => block.type === 'cta') ? 'pass' : 'warning',
      category: 'structure'
    });
    
    checksList.push({
      id: 'structure-faq',
      title: 'Perguntas frequentes',
      description: description.blocks.some(block => block.type === 'faq') 
        ? 'Contém seção de FAQ, excelente para SEO e rich snippets' 
        : 'Nenhuma seção de FAQ encontrada',
      status: description.blocks.some(block => block.type === 'faq') ? 'pass' : 'warning',
      category: 'structure'
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

  // Extract categories
  const categories = useMemo(() => {
    return Array.from(new Set(checks.map(check => check.category)));
  }, [checks]);

  // Return first item separately as it's the overall score
  const scoreItem = useMemo(() => checks.length > 0 ? checks[0] : null, [checks]);
  
  // Get the remaining checks (excluding the overall score)
  const checksByCategory = useMemo(() => {
    return categories.map(category => ({
      category,
      items: checks.filter(check => check.category === category && check.id !== 'overall-score')
    }));
  }, [checks, categories]);

  return { 
    checks, 
    categories, 
    scoreItem, 
    checksByCategory 
  };
};
