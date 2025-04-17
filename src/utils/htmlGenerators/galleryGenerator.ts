
import { GalleryBlock } from "@/types/editor";
import { getStylesFromBlock } from "../styleConverter";

export function generateGalleryBlockHtml(block: GalleryBlock): string {
  const { heading, images } = block;
  
  if (!images || images.length === 0) {
    return '';
  }
  
  // Get styles for the block
  const blockStyles = getStylesFromBlock(block);
  
  // Determine object-fit style
  const imageFitValue = block.style?.imageFit || 'contain';
  const objectFit = imageFitValue === 'cover' ? 'cover' : 'contain';
  
  // Calculate responsive column structure (1-4 columns)
  // Normalize columns value to a number for consistency
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  // Limit to maximum of 4 columns
  const columnCount = Math.min(Math.max(Number(columnsValue), 1), 4);
  
  // Calculate percentage width for each column
  const columnWidth = 100 / columnCount;
  
  // Generate HTML for each gallery image
  const imagesHtml = images.map(image => `
    <div class="gallery-image-container" style="display: inline-block; vertical-align: top; width: ${columnWidth}%; padding: 8px; box-sizing: border-box;">
      <figure style="margin: 0; text-align: center;">
        <img 
          src="${image.src}" 
          alt="${image.alt || ''}" 
          style="max-width: 100%; height: auto; object-fit: ${objectFit}; border-radius: 4px;"
        />
        ${image.caption ? `<figcaption style="margin-top: 8px; font-size: 14px; color: #6b7280;">${image.caption}</figcaption>` : ''}
      </figure>
    </div>
  `).join('');
  
  return `
    <div class="gallery-block" style="${blockStyles}" id="gallery-${block.id}">
      ${heading ? `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>` : ''}
      <div class="gallery-grid" style="font-size: 0; margin: 0 -8px;">
        ${imagesHtml}
      </div>
      <style>
        @media (max-width: 768px) {
          #gallery-${block.id} .gallery-image-container {
            width: 100% !important;
          }
        }
      </style>
    </div>
  `;
}
