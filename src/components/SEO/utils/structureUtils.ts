
import { ProductDescription, Block } from '@/types/editor';

/**
 * Extracts and analyzes heading structure from a product description
 */
export function extractHeaderStructure(description: ProductDescription) {
  const headings: { level: number; text: string }[] = [];
  let hasH1 = false;

  // Process each block to find headings
  description.blocks.forEach(block => {
    if (block.type === 'text' && 'content' in block) {
      // Extract h1-h6 tags from HTML content
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
      let match;
      while ((match = headingRegex.exec(block.content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]+>/g, '').trim();
        headings.push({ level, text });
        if (level === 1) hasH1 = true;
      }
    } 
    else if (block.type === 'hero' && 'heading' in block) {
      // Hero headings are typically h1
      headings.push({ level: 1, text: block.heading });
      hasH1 = true;
    }
    else if (['benefits', 'features'].includes(block.type) && 'heading' in block) {
      // Section headings are typically h2
      headings.push({ level: 2, text: block.heading });
    }
  });

  // Check heading hierarchy - no jumps like h1 to h3
  let hasProperHierarchy = true;
  let prevLevel = 0;
  
  for (const heading of headings) {
    if (prevLevel > 0 && heading.level > prevLevel + 1) {
      hasProperHierarchy = false;
      break;
    }
    prevLevel = heading.level;
  }
  
  // Calculate keyword consistency in headings
  const keywordCounts: Record<string, number> = {};
  const words = headings
    .map(h => h.text.toLowerCase())
    .join(' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  words.forEach(word => {
    keywordCounts[word] = (keywordCounts[word] || 0) + 1;
  });
  
  // Get top keywords in headings
  const topKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([keyword]) => keyword);
  
  return {
    headings,
    hasValidH1: hasH1,
    hasProperHierarchy,
    count: headings.length,
    topKeywords,
    structure: structureToString(headings)
  };
}

/**
 * Converts heading structure to a readable string format
 */
function structureToString(headings: { level: number; text: string }[]): string {
  return headings.map(h => `${'  '.repeat(h.level - 1)}H${h.level}: ${h.text}`).join('\n');
}

/**
 * Analyzes content structure including images, sections, and more
 */
export function analyzeContentStructure(description: ProductDescription) {
  const blockTypeCount: Record<string, number> = {};
  let wordCount = 0;
  let charCount = 0;
  let hasImages = false;
  let hasVideo = false;
  let hasLists = false;
  let sectionCount = 0;
  let imageCount = 0;
  let videoCount = 0;
  
  // Process each block
  description.blocks.forEach(block => {
    blockTypeCount[block.type] = (blockTypeCount[block.type] || 0) + 1;
    
    // Check for sections
    if (['hero', 'features', 'benefits', 'specifications'].includes(block.type)) {
      sectionCount++;
    }
    
    // Check for specific content types
    if (block.type === 'text' && 'content' in block) {
      const content = block.content;
      const plainText = content.replace(/<[^>]+>/g, ' ');
      const words = plainText.split(/\s+/).filter(Boolean);
      wordCount += words.length;
      charCount += plainText.length;
      
      // Check for lists in HTML
      if (/<ul|<ol/i.test(content)) {
        hasLists = true;
      }
    }
    
    // Check for media
    if (['image', 'gallery'].includes(block.type)) {
      hasImages = true;
      imageCount++;
      if (block.type === 'gallery' && 'images' in block) {
        imageCount += (block.images?.length || 0) - 1; // -1 because we already counted the gallery block
      }
    }
    
    if (block.type === 'video') {
      hasVideo = true;
      videoCount++;
    }
  });
  
  // Calculate content density (chars per section)
  const contentDensity = sectionCount > 0 ? charCount / sectionCount : charCount;
  
  // Calculate block type diversity
  const blockTypeDiversity = Object.keys(blockTypeCount).length;

  return {
    blockTypeDiversity,
    blockTypeCount,
    wordCount,
    charCount,
    contentDensity,
    hasImages,
    hasVideo,
    hasLists,
    sectionCount,
    imageCount,
    videoCount
  };
}
