
import { v4 as uuidv4 } from 'uuid';
import { ProductDescription, Block, BlockSpacing, SpacingSize } from '@/types/editor';
import { AIDescriptionInput } from './types';
import { determineLayoutStyle } from './helpers';
import {
  generateHeroBlock,
  generateFeaturesBlock,
  generateBenefitsBlock,
  generateImageTextBlock,
  generateSpecificationsBlock,
  generateGalleryBlock,
  generateFAQBlock,
  generateCompanyTextBlock,
  generateCTABlock
} from './blockGenerators';

export const generateAIDescription = async (input: AIDescriptionInput): Promise<ProductDescription> => {
  // Create a unique ID for the description
  const descriptionId = uuidv4();
  
  // Format the name
  const descriptionName = `Descrição de ${input.productName}`;
  
  // Create blocks array
  const blocks: Block[] = [];
  
  // Check if model image is provided
  const hasModelImage = !!input.modelImageUrl;
  
  // Get layout style based on whether a model image is provided
  const layoutStyle = determineLayoutStyle(hasModelImage);
  
  if (hasModelImage) {
    console.log("Usando imagem modelo para inspiração no layout: ", input.modelImageUrl);
  }
  
  // Generate hero block
  const heroBlock = generateHeroBlock(
    input.productName,
    input.productPrice,
    input.imageUrl,
    input.modelImageUrl,
    layoutStyle
  );
  blocks.push(heroBlock);
  
  // Generate features block
  const featuresBlock = generateFeaturesBlock(
    input.mainFeatures,
    hasModelImage,
    layoutStyle
  );
  if (featuresBlock) blocks.push(featuresBlock);
  
  // Generate benefits block
  const benefitsBlock = generateBenefitsBlock(
    input.targetAudience,
    input.mainFeatures,
    hasModelImage
  );
  if (benefitsBlock) blocks.push(benefitsBlock);
  
  // Generate image text block
  const imageTextBlock = generateImageTextBlock(
    input.productName,
    input.mainFeatures,
    input.imageUrl,
    input.modelImageUrl,
    hasModelImage
  );
  blocks.push(imageTextBlock);
  
  // Generate specifications block if additional info is provided
  const specificationsBlock = generateSpecificationsBlock(
    input.additionalInfo,
    hasModelImage
  );
  if (specificationsBlock) blocks.push(specificationsBlock);
  
  // Generate gallery block
  const galleryBlock = generateGalleryBlock(
    input.productName,
    input.imageUrl,
    input.modelImageUrl,
    hasModelImage
  );
  blocks.push(galleryBlock);
  
  // Generate FAQ block
  const faqBlock = generateFAQBlock(
    input.productName,
    input.targetAudience,
    input.mainFeatures,
    hasModelImage
  );
  blocks.push(faqBlock);
  
  // Generate company info text block
  const companyBlock = generateCompanyTextBlock(
    input.companyInfo,
    hasModelImage
  );
  blocks.push(companyBlock);
  
  // Generate CTA block
  const ctaBlock = generateCTABlock(
    input.productName,
    hasModelImage
  );
  blocks.push(ctaBlock);
  
  // Create the complete description
  const description: ProductDescription = {
    id: descriptionId,
    name: descriptionName,
    blocks,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return description;
};
