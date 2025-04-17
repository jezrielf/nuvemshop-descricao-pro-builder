
import { VideoUrlParserResult } from '../types';

export const parseYouTubeUrl = (url: string, autoplay: boolean = false): VideoUrlParserResult => {
  // Extract ID from YouTube URL
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    // Form URL of incorporation with autoplay and muting parameters
    const videoId = match[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${autoplay ? '1' : '0'}&rel=0`;
    
    return { 
      embedUrl, 
      isValid: true 
    };
  }
  
  return { 
    embedUrl: '', 
    isValid: false 
  };
};
