
// Utility functions for optimizing image loading performance

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  fit?: 'crop' | 'fill' | 'scale';
}

export const OPTIMIZATION_PRESETS = {
  thumbnail: { width: 400, height: 300, quality: 80, format: 'auto' as const, fit: 'crop' as const },
  gallery: { width: 800, height: 600, quality: 85, format: 'auto' as const, fit: 'crop' as const },
  hero: { width: 1200, height: 800, quality: 90, format: 'auto' as const, fit: 'crop' as const },
  preview: { width: 300, height: 200, quality: 75, format: 'auto' as const, fit: 'crop' as const }
};

/**
 * Optimizes Unsplash URLs with performance parameters
 */
export const optimizeUnsplashUrl = (url: string, options: ImageOptimizationOptions = {}): string => {
  if (!url || !url.includes('unsplash.com')) {
    return url; // Return as-is if not an Unsplash URL
  }

  const { width, height, quality = 80, format = 'auto', fit = 'crop' } = options;
  
  // Remove existing parameters to avoid conflicts
  const baseUrl = url.split('?')[0];
  
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('auto', format);
  params.set('fit', fit);
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Optimizes any image URL for better performance
 */
export const optimizeImageUrl = (url: string, preset: keyof typeof OPTIMIZATION_PRESETS): string => {
  const options = OPTIMIZATION_PRESETS[preset];
  return optimizeUnsplashUrl(url, options);
};

/**
 * Creates a placeholder data URL for better loading experience
 */
export const createPlaceholderDataUrl = (width: number = 400, height: number = 300): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Preloads critical images for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Lazy loading implementation using Intersection Observer
 */
export const setupLazyLoading = (imageElement: HTMLImageElement, src: string): void => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Start loading 50px before image comes into view
  });

  observer.observe(imageElement);
};
