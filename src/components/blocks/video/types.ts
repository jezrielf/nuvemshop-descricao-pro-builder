
export interface VideoFormValues {
  videoUrl: string;
  title: string;
  description?: string;
  autoplay: boolean;
  caption?: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export interface VideoUrlParserResult {
  embedUrl: string;
  isValid: boolean;
}
