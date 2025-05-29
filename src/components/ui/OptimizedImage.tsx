
import React, { useState, useRef, useEffect } from 'react';
import { optimizeImageUrl, OPTIMIZATION_PRESETS, createPlaceholderDataUrl } from '@/utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  preset?: keyof typeof OPTIMIZATION_PRESETS;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  preset = 'gallery',
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Optimize the source URL based on preset
  const optimizedSrc = optimizeImageUrl(currentSrc, preset);
  
  // Create placeholder for smooth loading
  const placeholderSrc = createPlaceholderDataUrl(
    OPTIMIZATION_PRESETS[preset].width,
    OPTIMIZATION_PRESETS[preset].height
  );

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
    setFallbackUsed(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    console.log('Image load error for:', optimizedSrc);
    
    // Try fallback first if provided and not used yet
    if (fallbackSrc && !fallbackUsed) {
      console.log('Trying fallback image:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      setFallbackUsed(true);
      setHasError(false);
      return;
    }
    
    // Try placeholder.svg as last resort
    if (currentSrc !== '/placeholder.svg') {
      console.log('Trying placeholder.svg as final fallback');
      setCurrentSrc('/placeholder.svg');
      setHasError(false);
      return;
    }
    
    // All fallbacks failed
    setHasError(true);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      {/* Main optimized image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Error fallback - simpler placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded"></div>
            <span className="text-xs">Preview</span>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-pulse w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
