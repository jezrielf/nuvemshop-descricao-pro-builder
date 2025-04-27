
import { TextVideoBlock } from "@/types/editor/blocks";
import { getStylesFromBlock } from "../styleConverter";

export function generateTextVideoBlockHtml(block: TextVideoBlock): string {
  try {
    // Use default values if properties are missing
    const videoUrl = block.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const aspectRatio = block.aspectRatio || '16:9';
    const heading = block.heading || '';
    const content = block.content || '<p>Adicione o texto aqui.</p>';
    const autoplay = block.autoplay ?? false;
    const muteAudio = block.muteAudio ?? true;
    
    // Set aspect ratio CSS class
    let aspectRatioClass = '';
    switch (aspectRatio) {
      case '16:9':
        aspectRatioClass = 'pb-[56.25%]';
        break;
      case '4:3':
        aspectRatioClass = 'pb-[75%]';
        break;
      case '1:1':
        aspectRatioClass = 'pb-[100%]';
        break;
      default:
        aspectRatioClass = 'pb-[56.25%]';
    }

    // Extract YouTube video ID with improved error handling
    const videoId = (() => {
      try {
        if (!videoUrl) return null;
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
        const match = videoUrl.match(regExp);
        return match?.[1] || null;
      } catch (e) {
        console.error('Error extracting video ID:', e);
        return null;
      }
    })();

    // Generate embed URL with safety checks
    const embedUrl = videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${muteAudio ? '1' : '0'}&rel=0`
      : '';
    
    // Generate container styles
    const containerStyle = getStylesFromBlock(block);
    
    return `
      <div class="text-video-block my-6" style="${containerStyle}">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2">
            ${heading ? `<h3 class="text-xl font-semibold mb-3" style="color: ${block.style?.headingColor || 'inherit'}">${heading}</h3>` : ''}
            <div class="prose max-w-none">${content || '<p>Adicione o texto aqui.</p>'}</div>
          </div>
          <div class="md:w-1/2 flex-shrink-0">
            <div class="video-container relative ${aspectRatioClass}">
              ${embedUrl ? `
                <iframe 
                  src="${embedUrl}" 
                  frameborder="0" 
                  allowfullscreen 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  class="absolute top-0 left-0 w-full h-full rounded"
                ></iframe>
              ` : `
                <div class="bg-gray-100 p-4 rounded text-center absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <p>URL de vídeo inválida</p>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error generating TextVideo block HTML:', error);
    return `
      <div class="error-block p-4 bg-red-50 text-red-600 rounded">
        Erro ao gerar bloco de Texto e Vídeo: ${error instanceof Error ? error.message : 'Erro desconhecido'}
      </div>
    `;
  }
}
