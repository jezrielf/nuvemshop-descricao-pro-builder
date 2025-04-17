
import { SpecificationsBlock } from "@/types/editor";

export function generateSpecificationsBlockHtml(block: SpecificationsBlock): string {
  const { heading, specs } = block;
  
  if (!specs || specs.length === 0) {
    return '';
  }
  
  // Determine whether to use grid or table based on columns
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  if (columnsValue > 1) {
    // Grid layout for multiple columns
    const gridColumns = Math.min(columnsValue, 4); // Cap at 4 columns
    return `
      <div class="specifications-block my-6">
        <h2 class="text-2xl font-bold mb-4">${heading || 'Especificações'}</h2>
        <div class="grid grid-cols-1 md:grid-cols-${gridColumns} gap-4">
          ${specs.map(spec => `
            <div class="border rounded-md p-3">
              <div class="font-medium">${spec.name}</div>
              <div>${spec.value}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    // Table layout for single column
    return `
      <div class="specifications-block my-6">
        <h2 class="text-2xl font-bold mb-4">${heading || 'Especificações'}</h2>
        <div class="border rounded-md overflow-hidden">
          <table class="w-full">
            <tbody>
              ${specs.map((spec, index) => `
                <tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                  <td class="p-3 border-b font-medium">${spec.name}</td>
                  <td class="p-3 border-b">${spec.value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
