
import { BlockType, ColumnLayout, Block } from '@/types/editor';
import {
  createHeroBlock,
  createTextBlock,
  createFeaturesBlock,
  createBenefitsBlock,
  createSpecificationsBlock,
  createImageBlock,
  createGalleryBlock,
  createImageTextBlock,
  createTextImageBlock,
  createFAQBlock,
  createCTABlock,
  createVideoBlock,
  createVideoTextBlock,
  createTextVideoBlock
} from './blocks';
import { ensureValidBlock } from './validation';

export const createBlock = (type: BlockType, columns: ColumnLayout = 'full'): Block => {
  try {
    console.log(`Criando bloco do tipo: ${type} com layout: ${columns}`);
    
    let block: Block;
    
    switch (type) {
      case 'hero':
        block = createHeroBlock(columns);
        break;
        
      case 'text':
        block = createTextBlock(columns);
        break;
        
      case 'features':
        block = createFeaturesBlock(columns);
        break;
        
      case 'benefits':
        block = createBenefitsBlock(columns);
        break;
        
      case 'specifications':
        block = createSpecificationsBlock(columns);
        break;
        
      case 'image':
        block = createImageBlock(columns);
        break;
        
      case 'gallery':
        block = createGalleryBlock(columns);
        break;
        
      case 'imageText':
        block = createImageTextBlock(columns);
        break;
        
      case 'textImage':
        block = createTextImageBlock(columns);
        break;
        
      case 'faq':
        block = createFAQBlock(columns);
        break;
        
      case 'cta':
        block = createCTABlock(columns);
        break;
        
      case 'video':
        block = createVideoBlock(columns);
        break;
        
      case 'videoText':
        try {
          block = createVideoTextBlock(columns);
          console.log("VideoText block created successfully:", block);
        } catch (videoTextError) {
          console.error("Error creating VideoText block:", videoTextError);
          // Fallback to text block with error information
          return createTextBlock(columns, "Erro ao criar bloco de Vídeo e Texto");
        }
        break;
        
      case 'textVideo':
        try {
          block = createTextVideoBlock(columns);
          console.log("TextVideo block created successfully:", block);
        } catch (textVideoError) {
          console.error("Error creating TextVideo block:", textVideoError);
          // Fallback to text block with error information
          return createTextBlock(columns, "Erro ao criar bloco de Texto e Vídeo");
        }
        break;
        
      default:
        // Provide a more detailed error message
        console.error(`Tipo de bloco não reconhecido: ${type}`);
        throw new Error(`Tipo de bloco não reconhecido: ${type}`);
    }
    
    // Ensure the block has all required properties
    if (!block.style) block.style = {};
    
    console.log(`Bloco criado com sucesso: ${block.id} (${block.type})`);
    
    // Validate the created block to ensure it has all required properties
    try {
      block = ensureValidBlock(block, type);
    } catch (validationError) {
      console.error(`Validation error for block ${type}:`, validationError);
      // Return a fallback text block with error information instead of throwing
      return createTextBlock(columns, `Erro na validação do bloco ${type}: ${validationError instanceof Error ? validationError.message : 'Erro desconhecido'}`);
    }
    
    return block;
  } catch (error) {
    console.error(`Erro ao criar bloco do tipo ${type}:`, error);
    // Fallback to a text block with error information
    return createTextBlock(columns, `Erro: Não foi possível criar bloco do tipo ${type}`);
  }
};
