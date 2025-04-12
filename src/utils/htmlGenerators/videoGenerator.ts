
import { VideoBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateVideoHtml = (block: VideoBlock): string => {
  // Get properly formatted style string
  const blockStyles = getStylesFromBlock(block);
  
  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url.match(regExp);
    
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${block.autoplay ? '1' : '0'}&mute=${block.autoplay ? '1' : '0'}&rel=0`;
    }
    
    return '';
  };
  
  const embedUrl = getYouTubeEmbedUrl(block.videoUrl);
  
  if (!embedUrl) {
    return `<div class="video-error" style="padding: 20px; background-color: #f8f8f8; border-radius: 4px; text-align: center; ${blockStyles}">
      <p>URL de vídeo inválida</p>
    </div>`;
  }
  
  // Generate HTML
  let html = '';
  
  if (block.title) {
    html += `<h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">${block.title}</h3>\n`;
  }
  
  html += `<div style="position: relative; padding-bottom: 56.25%; /* 16:9 aspect ratio */ height: 0; overflow: hidden; max-width: 100%; margin-bottom: 0.75rem;">\n`;
  html += `  <iframe src="${embedUrl}" title="${block.title || 'Video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 4px;"></iframe>\n`;
  html += `</div>\n`;
  
  if (block.description) {
    html += `<p style="color: #666;">${block.description}</p>\n`;
  }
  
  return html;
};
