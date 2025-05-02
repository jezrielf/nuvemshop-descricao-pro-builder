
import { VideoBlock } from "@/types/editor";
import { getStylesFromBlock } from "../styleConverter";

// Function to extract YouTube video ID from various URL formats
function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// Function to determine if a URL is a YouTube URL
function isYoutubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Function to extract Vimeo video ID from various URL formats
function getVimeoVideoId(url: string): string | null {
  const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Function to determine if a URL is a Vimeo URL
function isVimeoUrl(url: string): boolean {
  return url.includes('vimeo.com');
}

// Main function to generate HTML for a video block
export function generateVideoBlockHtml(block: VideoBlock): string {
  const { videoUrl, aspectRatio = '16:9', title, description } = block;
  const autoplay = block.autoplay ?? false;
  const muteAudio = block.muteAudio ?? true;
  
  // Set aspect ratio CSS
  let aspectRatioStyle = 'padding-bottom: 56.25%;'; // Default 16:9
  switch (aspectRatio) {
    case '16:9':
      aspectRatioStyle = 'padding-bottom: 56.25%;'; // 9/16 * 100%
      break;
    case '4:3':
      aspectRatioStyle = 'padding-bottom: 75%;'; // 3/4 * 100%
      break;
    case '1:1':
      aspectRatioStyle = 'padding-bottom: 100%;';
      break;
  }
  
  // Generate container styles
  const containerStyle = getStylesFromBlock(block);
  const blockId = `video-${block.id}`;
  
  // Default embed code (fallback for non-YouTube/Vimeo URLs)
  let embedCode = `<video controls src="${videoUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" ${autoplay ? 'autoplay' : ''} ${muteAudio ? 'muted' : ''}></video>`;
  
  // Process YouTube videos
  if (isYoutubeUrl(videoUrl)) {
    const videoId = getYoutubeVideoId(videoUrl);
    if (videoId) {
      embedCode = `<iframe 
        src="https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${muteAudio ? '1' : '0'}&rel=0" 
        frameborder="0" 
        allowfullscreen 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
      ></iframe>`;
    }
  } 
  // Process Vimeo videos
  else if (isVimeoUrl(videoUrl)) {
    const videoId = getVimeoVideoId(videoUrl);
    if (videoId) {
      embedCode = `<iframe 
        src="https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? '1' : '0'}&muted=${muteAudio ? '1' : '0'}" 
        frameborder="0" 
        allowfullscreen 
        allow="autoplay; fullscreen; picture-in-picture" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
      ></iframe>`;
    }
  }
  
  // Generate complete HTML with title and description (if provided)
  return `
    <div id="${blockId}" style="${containerStyle || ''}">
      ${title ? `<h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">${title}</h3>` : ''}
      ${description ? `<p style="margin-bottom: 1rem; color: #666;">${description}</p>` : ''}
      <div style="position: relative; overflow: hidden; width: 100%; ${aspectRatioStyle}">
        ${embedCode}
      </div>
    </div>
  `;
}
