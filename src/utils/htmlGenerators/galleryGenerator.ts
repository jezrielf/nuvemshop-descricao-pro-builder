
import { GalleryBlock } from "@/types/editor";

export function generateGalleryBlockHtml(block: GalleryBlock): string {
  const { heading, images } = block;
  
  if (!images || images.length === 0) {
    return '';
  }
  
  // Determine the number of columns based on block.columns
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  // Convert to number for comparison
  const gridColumns = Math.min(Math.max(Number(columnsValue), 1), 4); // Between 1 and 4 columns
  
  return `
    <div class="gallery-block my-6">
      ${heading ? `<h2 class="text-2xl font-bold mb-4">${heading}</h2>` : ''}
      <div class="grid grid-cols-1 md:grid-cols-${gridColumns} gap-4">
        ${images.map(image => `
          <figure class="text-center">
            <img 
              src="${image.src}" 
              alt="${image.alt || ''}" 
              class="w-full h-auto object-contain rounded-md"
            />
            ${image.caption ? `<figcaption class="mt-2 text-sm text-gray-600">${image.caption}</figcaption>` : ''}
          </figure>
        `).join('')}
      </div>
    </div>
  `;
}
