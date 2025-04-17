
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
  // Convert columns from ColumnLayout to a number
  const columnsValue = (() => {
    if (typeof block.columns === 'number') return block.columns;
    if (block.columns === 'full' || block.columns === '1/1') return 1;
    if (block.columns === '1/2') return 2;
    if (block.columns === '1/3') return 3;
    if (block.columns === '2/3') return 2;
    if (block.columns === '1/4') return 4;
    if (block.columns === '3/4') return 1;
    return 1; // Default to 1 column
  })();
  
  // Limit to maximum of 4 columns
  const columnCount = Math.min(Math.max(Number(columnsValue), 1), 4);
  
  // Generate HTML for each gallery image
  const imagesHtml = images.map(image => {
    return `
      <div class="gallery-item" style="display: inline-block; vertical-align: top; width: ${100/columnCount}%; padding: 8px; box-sizing: border-box;">
        <figure style="margin: 0; text-align: center;">
          <img 
            src="${image.src}" 
            alt="${image.alt || ''}" 
            style="max-width: 100%; height: auto; object-fit: ${objectFit}; border-radius: 4px;"
          />
          ${image.caption ? `<figcaption style="margin-top: 8px; font-size: 14px; color: #6b7280;">${image.caption}</figcaption>` : ''}
        </figure>
      </div>
    `;
  }).join('');
  
  // Create more robust responsive styles for the gallery items
  return `
    <div class="gallery-block" style="${blockStyles}" id="gallery-${block.id}">
      ${heading ? `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>` : ''}
      <div class="gallery-grid" style="font-size: 0; margin: 0 -8px; text-align: left;">
        ${imagesHtml}
      </div>
      <style>
        @media (max-width: 768px) {
          #gallery-${block.id} .gallery-item {
            width: 100% !important;
          }
        }
      </style>
    </div>
  `;
}
