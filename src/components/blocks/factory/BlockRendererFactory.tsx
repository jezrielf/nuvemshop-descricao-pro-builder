
import React from 'react';
import { Block, BlockType, TextBlock } from '@/types/editor';
import HeroBlock from '../HeroBlock';
import TextBlock as TextBlockComponent from '../TextBlock';
import FeaturesBlock from '../FeaturesBlock';
import BenefitsBlock from '../BenefitsBlock';
import SpecificationsBlock from '../SpecificationsBlock';
import ImageBlock from '../ImageBlock';
import GalleryBlock from '../gallery';
import ImageTextBlock from '../ImageTextBlock';
import TextImageBlock from '../TextImageBlock';
import FAQBlock from '../FAQBlock';
import CTABlock from '../CTABlock';
import VideoBlock from '../VideoBlock';
import { validateBaseBlock, validateBlockByType } from '@/utils/blockCreators/validation';
import { createBlock } from '@/utils/blockCreators/createBlock';

interface BlockRendererOptions {
  block: Block;
  isPreview?: boolean;
}

/**
 * Factory class for rendering different block types
 */
export class BlockRendererFactory {
  /**
   * Creates the appropriate block component based on block type
   */
  public static createBlockComponent({ block, isPreview = false }: BlockRendererOptions): React.ReactNode {
    // Tenta validar o bloco e corrigir problemas comuns
    try {
      block = this.attemptToFixBlock(block);
    } catch (error) {
      console.error('Erro ao tentar consertar bloco:', error);
      // Continua com o bloco original se a correção falhar
    }

    if (!this.isValidBlock(block)) {
      return this.createErrorComponent('Bloco inválido ou com formato incorreto');
    }

    if (!this.hasValidType(block)) {
      return this.createErrorComponent('Bloco sem tipo definido ou com tipo inválido');
    }

    if (!this.hasRequiredProperties(block)) {
      return this.createRecoveryComponent(block, isPreview);
    }

    switch (block.type) {
      case 'hero':
        return <HeroBlock block={block} isPreview={isPreview} />;
      case 'text':
        return <TextBlockComponent block={block} isPreview={isPreview} />;
      case 'features':
        return <FeaturesBlock block={block} isPreview={isPreview} />;
      case 'benefits':
        return <BenefitsBlock block={block} isPreview={isPreview} />;
      case 'specifications':
        return <SpecificationsBlock block={block} isPreview={isPreview} />;
      case 'image':
        return <ImageBlock block={block} isPreview={isPreview} />;
      case 'gallery':
        return <GalleryBlock block={block} isPreview={isPreview} />;
      case 'imageText':
        return <ImageTextBlock block={block} isPreview={isPreview} />;
      case 'textImage':
        return <TextImageBlock block={block} isPreview={isPreview} />;
      case 'faq':
        return <FAQBlock block={block} isPreview={isPreview} />;
      case 'cta':
        return <CTABlock block={block} isPreview={isPreview} />;
      case 'video':
        return <VideoBlock block={block} isPreview={isPreview} />;
      default:
        return (
          <div className="p-4 border rounded-md bg-gray-100">
            <p className="text-gray-500">Bloco do tipo "{(block as any).type}" não implementado ainda.</p>
          </div>
        );
    }
  }

  /**
   * Tenta corrigir problemas comuns em blocos inválidos
   */
  private static attemptToFixBlock(block: any): Block {
    if (!block) {
      throw new Error('Bloco indefinido');
    }
    
    // Copia o bloco para não modificar o original
    const fixedBlock = { ...block };
    
    // Garante que tem um ID
    if (!fixedBlock.id) {
      fixedBlock.id = `fixed-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    }
    
    // Garante que tem um tipo válido
    if (!fixedBlock.type || typeof fixedBlock.type !== 'string' || !this.isValidBlockType(fixedBlock.type)) {
      // Default para texto se o tipo for inválido
      fixedBlock.type = 'text';
    }
    
    // Garante que tem uma propriedade de visibilidade
    if (fixedBlock.visible === undefined) {
      fixedBlock.visible = true;
    }
    
    // Garante que tem um layout de colunas
    if (!fixedBlock.columns) {
      fixedBlock.columns = 'full';
    }
    
    // Garante que tem um estilo
    if (!fixedBlock.style || typeof fixedBlock.style !== 'object') {
      fixedBlock.style = {};
    }
    
    // Garante que tem um título
    if (!fixedBlock.title) {
      fixedBlock.title = this.getDefaultTitleForType(fixedBlock.type);
    }

    // Para blocos de texto, verifica se tem heading e content
    if (fixedBlock.type === 'text') {
      if (!fixedBlock.heading) {
        fixedBlock.heading = 'Título do Texto';
      }
      if (!fixedBlock.content) {
        fixedBlock.content = '<p>Insira o conteúdo aqui.</p>';
      }
    }
    
    return fixedBlock as Block;
  }

  /**
   * Verifica se o tipo de bloco é válido
   */
  private static isValidBlockType(type: string): boolean {
    const validTypes = [
      'hero', 'text', 'features', 'benefits', 'specifications', 
      'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta', 'video'
    ];
    
    return validTypes.includes(type);
  }

  /**
   * Obtém um título padrão para um tipo de bloco
   */
  private static getDefaultTitleForType(type: string): string {
    switch (type) {
      case 'hero': return 'Destaque Principal';
      case 'text': return 'Texto';
      case 'features': return 'Recursos';
      case 'benefits': return 'Benefícios';
      case 'specifications': return 'Especificações';
      case 'image': return 'Imagem';
      case 'gallery': return 'Galeria';
      case 'imageText': return 'Imagem e Texto';
      case 'textImage': return 'Texto e Imagem';
      case 'faq': return 'Perguntas Frequentes';
      case 'cta': return 'Chamada para Ação';
      case 'video': return 'Vídeo';
      default: return 'Bloco';
    }
  }

  /**
   * Cria um componente que tenta recuperar um bloco com problemas
   */
  public static createRecoveryComponent(block: any, isPreview: boolean): React.ReactNode {
    try {
      console.log('Tentando recuperar bloco com problemas:', block);
      
      // Tenta criar um novo bloco do mesmo tipo, mas válido
      const newBlock = createBlock(block.type as BlockType);
      
      // Copia propriedades seguras do bloco original, se existirem
      if (block.title) newBlock.title = block.title;
      if (block.id) newBlock.id = block.id;
      if (block.style && typeof block.style === 'object') newBlock.style = { ...block.style };
      
      // Checamos especificamente por cada propriedade para evitar erros de tipo
      // Checar propriedades específicas do tipo TextBlock
      if (block.type === 'text') {
        if ('heading' in block) (newBlock as TextBlock).heading = block.heading;
        if ('content' in block) (newBlock as TextBlock).content = block.content;
      }
      
      console.log('Bloco recuperado:', newBlock);
      
      // Renderiza um bloco de texto com o conteúdo original, se possível
      return (
        <div className="border border-yellow-300 bg-yellow-50 rounded-md">
          <div className="bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            Bloco recuperado - alguns dados podem estar faltando
          </div>
          {this.createBlockComponent({ block: newBlock, isPreview })}
        </div>
      );
    } catch (error) {
      console.error('Falha ao tentar recuperar bloco:', error);
      return this.createErrorComponent(`Bloco do tipo "${block?.type || 'desconhecido'}" está faltando propriedades obrigatórias`);
    }
  }

  /**
   * Validates if a block is valid before rendering
   */
  public static isValidBlock(block: any): boolean {
    if (!block || typeof block !== 'object') {
      console.error('Bloco inválido:', block);
      return false;
    }
    
    try {
      return validateBaseBlock(block);
    } catch (error) {
      console.error('Erro na validação básica de bloco:', error);
      return false;
    }
  }

  /**
   * Validates if a block has a valid type
   */
  public static hasValidType(block: any): boolean {
    return 'type' in block && typeof block.type === 'string' && this.isValidBlockType(block.type);
  }

  /**
   * Validates if a block has all the required properties for its type
   */
  public static hasRequiredProperties(block: any): boolean {
    try {
      return validateBlockByType(block);
    } catch (error) {
      console.error(`Erro na validação do bloco tipo ${block?.type}:`, error);
      return false;
    }
  }

  /**
   * Creates an error component for invalid blocks
   */
  public static createErrorComponent(message: string): React.ReactNode {
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-600">
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs mt-1">Tente substituir este bloco por um novo.</p>
      </div>
    );
  }
}
