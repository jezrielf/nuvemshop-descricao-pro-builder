
/**
 * Utility functions for handling embedded mode within Nuvemshop admin
 */

/**
 * Check if the application is running embedded within Nuvemshop admin
 */
export const isEmbeddedInNuvemshop = (): boolean => {
  // Check if running inside an iframe
  const isInIframe = window.self !== window.top;
  
  // Check for Nuvemshop specific URL parameters or referrer
  const urlParams = new URLSearchParams(window.location.search);
  const hasNuvemshopParams = urlParams.has('session_token') || 
                            urlParams.has('token') || 
                            urlParams.has('store_id');
  
  // Check if the referrer is from Nuvemshop domains
  const referrer = document.referrer || '';
  const isNuvemshopReferrer = referrer.includes('tiendanube.com') || 
                              referrer.includes('nuvemshop.com.br') ||
                              referrer.includes('myshopify.com');
  
  // Check for the presence of Nuvemshop specific objects
  const hasNuvemshopContext = 'Nuvemshop' in window || 'Tiendanube' in window;
  
  return isInIframe && (hasNuvemshopParams || isNuvemshopReferrer || hasNuvemshopContext);
};

/**
 * Extract the session token from URL when embedded in Nuvemshop admin
 * According to Nuvemshop documentation, the token is provided in the URL as 'session_token'
 */
export const getNuvemshopSessionToken = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Try the standard parameter name first
  let token = urlParams.get('session_token');
  
  // Fallback to alternative parameter names
  if (!token) {
    token = urlParams.get('token');
  }
  
  return token;
};

/**
 * Extract the store ID from URL when embedded in Nuvemshop admin
 */
export const getEmbeddedStoreId = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('store_id');
};

/**
 * Log information about embedded environment detection
 */
export const logEmbeddedEnvironmentInfo = () => {
  const isEmbedded = isEmbeddedInNuvemshop();
  const sessionToken = getNuvemshopSessionToken();
  const storeId = getEmbeddedStoreId();
  
  console.log('[Nuvemshop Embedded] Environment detection:', {
    isEmbedded,
    hasSessionToken: !!sessionToken,
    storeId,
    referrer: document.referrer || 'none',
    parentUrl: window.parent !== window ? 'different from self' : 'same as self',
    manifestDetected: !!document.querySelector('link[rel="manifest"]'),
    userAgent: navigator.userAgent
  });
  
  return { isEmbedded, sessionToken, storeId };
};

/**
 * Register the app with Nuvemshop's routing system when in embedded mode
 */
export const registerWithNuvemshopRouter = () => {
  if (!isEmbeddedInNuvemshop()) return;
  
  try {
    if (window.Nuvemshop?.Router) {
      // Register routes with Nuvemshop Router
      window.Nuvemshop.Router.on('/nexo-admin', () => {
        console.log('[Nuvemshop Router] Nexo admin route loaded');
        // Any specific actions needed when route is loaded
      });
      
      console.log('[Nuvemshop Router] Routes registered successfully');
    }
  } catch (error) {
    console.error('[Nuvemshop Router] Failed to register routes:', error);
  }
};

/**
 * Define the Nuvemshop global object for TypeScript
 */
declare global {
  interface Window {
    Nuvemshop?: {
      Router: {
        on: (path: string, callback: () => void) => void;
      };
      App?: {
        getInfo: () => any;
      };
    };
    Tiendanube?: {
      Router: {
        on: (path: string, callback: () => void) => void;
      };
      App?: {
        getInfo: () => any;
      };
    };
  }
}
