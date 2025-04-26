
import { TextVideoBlock } from "@/types/editor/blocks/textVideo";
import { getStylesFromBlock } from "../styleConverter";

// Function to extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export function generateTextVideoBlockHtml(block: TextVideoBlock): string {
  const { videoUrl, headline, content, buttonText, buttonUrl } = block;
  const autoplay = block.autoplay ?? false;
  const muteAudio = block.muteAudio ?? true;
  
  // Generate container styles
  const containerStyle = getStylesFromBlock(block);
  
  // Extract YouTube video ID and create embed URL
  const videoId = getYoutubeVideoId(videoUrl);
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${muteAudio ? '1' : '0'}&rel=0` 
    : '';
  
  // Create the video embed code
  const videoEmbed = embedUrl 
    ? `<div class="text-video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
         <iframe 
           src="${embedUrl}" 
           style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
           allowfullscreen 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
         </iframe>
       </div>` 
    : `<div style="padding: 56.25% 0 0 0; position: relative; background-color: #f0f0f0;">
         <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #666;">
           URL de vídeo inválida
         </div>
       </div>`;
  
  // Create button HTML if button text and URL are provided
  const buttonHtml = buttonText && buttonUrl 
    ? `<a href="${buttonUrl}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background-color: #0088cc; color: white; text-decoration: none; border-radius: 4px;">${buttonText}</a>` 
    : '';
  
  // Create the complete HTML for the block
  return `
    <div class="text-video-block ns-row" style="${containerStyle}">
      <div class="ns-column-half text-section">
        ${headline ? `<h3 style="font-size: 1.5rem; margin-bottom: 1rem; ${block.style?.headingColor ? `color: ${block.style.headingColor};` : ''}">${headline}</h3>` : ''}
        <div style="margin-bottom: 1rem; ${block.style?.textColor ? `color: ${block.style.textColor};` : ''}">${content}</div>
        ${buttonHtml}
      </div>
      <div class="ns-column-half video-section">
        ${videoEmbed}
      </div>
    </div>
  `;
}
