
import { Block } from '@/types/editor';
import { analyzeDocument } from './analyzers/documentAnalyzer';
import { v4 as uuidv4 } from 'uuid';

/**
 * Analisa descrições HTML de produtos e converte em blocos editáveis
 * @param htmlContent string HTML da descrição do produto
 * @returns Array de blocos estruturados
 */
export const parseHtmlToBlocks = (htmlContent: string): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    // Criar um documento DOM para analisar
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Remove scripts por segurança
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // Array para armazenar os blocos analisados
    const parsedBlocks: Block[] = [];

    // Usa o analisador de documentos existente para identificar e converter seções
    analyzeDocument(doc, parsedBlocks);

    console.log('Blocos gerados:', parsedBlocks);
    return parsedBlocks;

  } catch (error) {
    console.error('Erro ao analisar HTML em blocos:', error);
    return [];
  }
};

