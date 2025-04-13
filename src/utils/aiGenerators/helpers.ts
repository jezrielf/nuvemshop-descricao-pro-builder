
import { TextAlign, SpacingSize, BlockSpacing } from '@/types/editor';

// Placeholder images for the generated blocks
export const placeholderImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  'https://images.unsplash.com/photo-1581591524425-c7e0978865fc',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
];

// Helper to get a random placeholder image
export const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

// Helper to extract and format key points from a text
export const extractKeyPoints = (text: string): string[] => {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  
  // Get some sentences as key points
  return sentences
    .slice(0, Math.min(sentences.length, 5))
    .map(s => s.trim())
    .filter(s => s.length > 15); // Filter out too short sentences
};

// Helper to determine layout style based on model image
export const determineLayoutStyle = (hasModelImage: boolean): {
  backgroundColor: string;
  headingColor: string;
  textAlign: TextAlign;
  padding: SpacingSize;
  blockSpacing: BlockSpacing;
} => {
  if (hasModelImage) {
    return {
      backgroundColor: '#f0f9ff',
      headingColor: '#0f172a',
      textAlign: 'center' as TextAlign,
      padding: 'xl' as SpacingSize,
      blockSpacing: 'lg' as BlockSpacing
    };
  }
  
  return {
    backgroundColor: '#f9fafb',
    headingColor: '#1f2937',
    textAlign: 'center' as TextAlign,
    padding: 'lg' as SpacingSize,
    blockSpacing: 'md' as BlockSpacing
  };
};
