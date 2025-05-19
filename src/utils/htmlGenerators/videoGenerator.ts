
import { VideoBlock } from '@/types/editor/blocks';

export const generateVideoBlockHtml = (block: VideoBlock): string => {
  const { videoUrl, aspectRatio = '16:9', description, autoplay = false, muteAudio = true, title } = block;
  
  if (!videoUrl) {
    return '<div class="video-container" style="padding: 1rem; text-align: center; border: 1px solid #e5e7eb; border-radius: 0.5rem;"><p>Vídeo não disponível</p></div>';
  }
  
  // Extract video ID if it's a YouTube URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Match YouTube URL patterns
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      // Format parameters for embed URL
      const autoplayParam = autoplay ? 'autoplay=1&' : '';
      const muteParam = muteAudio ? 'mute=1&' : '';
      
      return `https://www.youtube.com/embed/${match[1]}?${autoplayParam}${muteParam}rel=0`;
    }
    
    // Return original URL if not a YouTube link
    return url;
  };
  
  const embedUrl = getYoutubeEmbedUrl(videoUrl);
  
  // Determine aspect ratio style for the container
  let aspectRatioStyle = 'padding-top: 56.25%;'; // Default 16:9 ratio
  if (aspectRatio === '4:3') {
    aspectRatioStyle = 'padding-top: 75%;';
  } else if (aspectRatio === '1:1') {
    aspectRatioStyle = 'padding-top: 100%;';
  }
  
  // Generate inline styles from block.style
  const inlineStyles = Object.entries(block.style || {})
    .map(([key, value]) => {
      if (!value) return '';
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .filter(Boolean)
    .join(' ');
    
  const containerStyle = inlineStyles ? `style="${inlineStyles}"` : '';
  
  return `
    <div class="video-block" ${containerStyle}>
      ${title ? `<h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">${title}</h3>` : ''}
      
      <div class="video-container" style="position: relative; width: 100%; ${aspectRatioStyle}">
        <iframe 
          src="${embedUrl}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 0.375rem;" 
          title="${title || 'Video'}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
      
      ${description ? `<p class="video-description" style="margin-top: 0.75rem; font-size: 0.875rem; color: #4b5563;">${description}</p>` : ''}
    </div>
  `;
};
