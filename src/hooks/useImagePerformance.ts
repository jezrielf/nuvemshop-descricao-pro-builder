
import { useState, useEffect, useCallback } from 'react';
import { optimizeImageUrl, preloadImage, OPTIMIZATION_PRESETS } from '@/utils/imageOptimization';

interface UseImagePerformanceOptions {
  preloadCritical?: boolean;
  preset?: keyof typeof OPTIMIZATION_PRESETS;
}

export const useImagePerformance = (src: string, options: UseImagePerformanceOptions = {}) => {
  const { preloadCritical = false, preset = 'gallery' } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optimize the image URL
  const optimizedSrc = optimizeImageUrl(src, preset);

  // Preload critical images
  useEffect(() => {
    if (preloadCritical && optimizedSrc) {
      setIsLoading(true);
      preloadImage(optimizedSrc)
        .then(() => {
          setIsLoaded(true);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || 'Failed to load image');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [optimizedSrc, preloadCritical]);

  const loadImage = useCallback(() => {
    if (!optimizedSrc || isLoaded || isLoading) return;

    setIsLoading(true);
    setError(null);

    preloadImage(optimizedSrc)
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load image');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [optimizedSrc, isLoaded, isLoading]);

  return {
    optimizedSrc,
    isLoaded,
    isLoading,
    error,
    loadImage
  };
};
