
import { Block } from '@/types/editor';
import { generateHeroSection } from './sections/heroSection';
import { generateBenefitsHeader } from './sections/benefitsHeader';
import { generateIntroSection } from './sections/introSection';
import { generateVideoSection } from './sections/videoSection';
import { generateBenefitsSection } from './sections/benefitsSection';
import { generateProductHeading } from './sections/productHeading';
import { generateProductSections } from './sections/productSections';
import { generateProductSummary } from './sections/productSummary';
import { generateTargetAudienceSection } from './sections/targetAudienceSection';
import { generateGuaranteesSection } from './sections/guaranteesSection';
import { generateCtaSection } from './sections/ctaSection';

export const generateHealthSupplementTemplate = (addBlock: (block: Block) => void) => {
  // Hero section
  generateHeroSection(addBlock);
  
  // Benefits header section
  generateBenefitsHeader(addBlock);
  
  // Intro section with image
  generateIntroSection(addBlock);
  
  // Video section
  generateVideoSection(addBlock);
  
  // Benefits checklist section
  generateBenefitsSection(addBlock);
  
  // Product details heading
  generateProductHeading(addBlock);
  
  // Product detail sections
  generateProductSections(addBlock);
  
  // Product summary text
  generateProductSummary(addBlock);
  
  // Target audience section
  generateTargetAudienceSection(addBlock);
  
  // Quality guarantees section
  generateGuaranteesSection(addBlock);
  
  // Call to action block
  generateCtaSection(addBlock);
};
