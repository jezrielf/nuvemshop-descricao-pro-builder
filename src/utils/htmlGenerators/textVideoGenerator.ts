
import { TextVideoBlock } from "@/types/editor/blocks";
import { getStylesFromBlock } from "../styleConverter";

export function generateTextVideoBlockHtml(block: TextVideoBlock): string {
  const { videoUrl, aspectRatio = '16:9', heading, content } = block;
  const autoplay = block.autoplay || false;
  const muteAudio = block.muteAudio || false;
  
  // Extract YouTube video ID and create embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url.match(regExp);
    
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${muteAudio ? '1' : '0'}&rel=0`;
    }
    
    return '';
  };
  
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  
  // Set aspect ratio CSS class
  let aspectRatioClass = '';
  switch (aspectRatio) {
    case '16:9':
      aspectRatioClass = 'pb-[56.25%]'; // 9/16 * 100%
      break;
    case '4:3':
      aspectRatioClass = 'pb-[75%]'; // 3/4 * 100%
      break;
    case '1:1':
      aspectRatioClass = 'pb-[100%]';
      break;
    default:
      aspectRatioClass = 'pb-[56.25%]'; // Default to 16:9
  }
  
  // Generate container styles
  const containerStyle = getStylesFromBlock(block);
  
  // Construct the full HTML
  return `
    <div class="text-video-block my-6" style="${containerStyle}">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2">
          ${heading ? `<h3 class="text-xl font-semibold mb-3" style="color: ${block.style?.headingColor || 'inherit'}">${heading}</h3>` : ''}
          <div class="prose max-w-none">${content}</div>
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
}
