
import { VideoBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

/**
 * Extracts YouTube video ID from different YouTube URL formats
 * @param url The YouTube URL
 * @returns The video ID or empty string if not found
 */
const getYoutubeVideoId = (url: string): string => {
  if (!url) return '';
  
  // Regular expression to extract YouTube video ID from various URL formats
  const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[1]) ? match[1] : '';
};

/**
 * Generate HTML for a video block
 * @param block The video block configuration
 * @returns HTML string representation of the video block
 */
export const generateVideoBlockHtml = (block: VideoBlock): string => {
  const videoId = getYoutubeVideoId(block.videoUrl);
  if (!videoId) {
    return `
      <div style="padding:20px;background-color:#f8f8f8;border-radius:6px;text-align:center;margin-bottom:20px;">
        <p style="color:#666;">URL de vídeo inválida ou não suportada</p>
      </div>
    `;
  }
  
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  const autoplay = block.autoplay ? '1' : '0';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&mute=${autoplay}&rel=0`;
  
  // Calculate aspect ratio class
  let aspectRatioClass = 'aspect-16-9';
  if (block.aspectRatio === '4:3') {
    aspectRatioClass = 'aspect-4-3';
  } else if (block.aspectRatio === '1:1') {
    aspectRatioClass = 'aspect-1-1';
  }
  
  // Inline CSS for aspect ratios
  const aspectRatioStyles = `
    .aspect-16-9 { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; width: 100%; }
    .aspect-4-3 { position: relative; padding-bottom: 75%; height: 0; overflow: hidden; width: 100%; }
    .aspect-1-1 { position: relative; padding-bottom: 100%; height: 0; overflow: hidden; width: 100%; }
    .video-responsive iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
  `;
  
  return `
    <style>${aspectRatioStyles}</style>
    <div${blockStyleAttr} class="video-block">
      ${block.heading ? `<h2 style="font-size:24px;font-weight:600;margin-bottom:16px;">${block.heading}</h2>` : ''}
      <div class="video-responsive ${aspectRatioClass}">
        <iframe 
          src="${embedUrl}" 
          title="${block.title || 'Video'}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      ${block.caption ? `<p style="font-size:14px;color:#666;margin-top:8px;">${block.caption}</p>` : ''}
      ${block.description ? `<div style="margin-top:16px;">${block.description}</div>` : ''}
    </div>
  `;
};
