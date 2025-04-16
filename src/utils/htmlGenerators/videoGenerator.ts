
import { VideoBlock } from "@/types/editor/blocks/VideoBlock";
import { BlockStyle } from "@/types/editor";
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
  const { videoUrl, aspectRatio = '16:9', heading, caption, style } = block;
  
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
  
  // Default embed code (fallback for non-YouTube/Vimeo URLs)
  let embedCode = `<video controls src="${videoUrl}" class="absolute top-0 left-0 w-full h-full"></video>`;
  
  // Process YouTube videos
  if (isYoutubeUrl(videoUrl)) {
    const videoId = getYoutubeVideoId(videoUrl);
    if (videoId) {
      embedCode = `<iframe 
        src="https://www.youtube.com/embed/${videoId}" 
        frameborder="0" 
        allowfullscreen 
        class="absolute top-0 left-0 w-full h-full"
      ></iframe>`;
    }
  } 
  // Process Vimeo videos
  else if (isVimeoUrl(videoUrl)) {
    const videoId = getVimeoVideoId(videoUrl);
    if (videoId) {
      embedCode = `<iframe 
        src="https://player.vimeo.com/video/${videoId}" 
        frameborder="0" 
        allowfullscreen 
        class="absolute top-0 left-0 w-full h-full"
      ></iframe>`;
    }
  }
  
  // Construct the full HTML for the video block
  return `
    <div class="video-block my-6" style="${containerStyle}">
      ${heading ? `<h3 class="text-xl font-semibold mb-3" style="color: ${(style as BlockStyle)?.headingColor || 'inherit'}">${heading}</h3>` : ''}
      <div class="video-container relative ${aspectRatioClass}">
        ${embedCode}
      </div>
      ${caption ? `<p class="text-sm mt-2 text-gray-600" style="color: ${(style as BlockStyle)?.textColor || 'inherit'}">${caption}</p>` : ''}
    </div>
  `;
}
