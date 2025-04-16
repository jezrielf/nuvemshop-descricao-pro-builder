
import { VideoBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateVideoHtml = (block: VideoBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  // Extract YouTube or Vimeo video ID
  let videoEmbedHtml = '';
  const videoUrl = block.videoUrl || '';
  
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    // Handle YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(youtubeRegex);
    const videoId = match ? match[1] : '';
    
    if (videoId) {
      videoEmbedHtml = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:4px;">
          <iframe 
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
            src="https://www.youtube.com/embed/${videoId}" 
            title="${block.title || 'Vídeo'}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `;
    }
  } else if (videoUrl.includes('vimeo.com')) {
    // Handle Vimeo URLs
    const vimeoRegex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = videoUrl.match(vimeoRegex);
    const videoId = match ? match[1] : '';
    
    if (videoId) {
      videoEmbedHtml = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;border-radius:4px;">
          <iframe 
            style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
            src="https://player.vimeo.com/video/${videoId}" 
            title="${block.title || 'Vídeo'}" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      `;
    }
  } else if (videoUrl) {
    // Handle direct video URLs
    videoEmbedHtml = `
      <div style="max-width:100%;border-radius:4px;">
        <video 
          controls 
          style="width:100%;height:auto;max-width:100%;border-radius:4px;" 
          title="${block.title || 'Vídeo'}"
        >
          <source src="${videoUrl}" type="video/mp4">
          Seu navegador não suporta a reprodução de vídeos.
        </video>
      </div>
    `;
  } else {
    // Placeholder for when no video URL is provided
    videoEmbedHtml = `
      <div style="background-color:#f3f4f6;height:315px;display:flex;align-items:center;justify-content:center;border-radius:4px;">
        <span style="color:#9ca3af;">Vídeo não disponível</span>
      </div>
    `;
  }

  return `
    <div${blockStyleAttr} style="width:100%;text-align:center;">
      ${block.heading ? `<h2 style="font-size:24px;font-weight:bold;margin-bottom:16px;text-align:center;">${block.heading}</h2>` : ''}
      ${videoEmbedHtml}
      ${block.caption ? `<p style="margin-top:12px;font-size:14px;color:#6b7280;text-align:center;">${block.caption}</p>` : ''}
    </div>
  `;
};
