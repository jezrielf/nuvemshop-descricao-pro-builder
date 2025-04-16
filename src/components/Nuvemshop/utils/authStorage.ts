
/**
 * Utility functions for managing Nuvemshop authentication storage
 */

// Store authentication data in localStorage
export const storeAuthData = (accessToken: string, userId: string, storeName: string | null) => {
  localStorage.setItem('nuvemshop_access_token', accessToken);
  localStorage.setItem('nuvemshop_user_id', userId);
  localStorage.setItem('nuvemshop_store_name', storeName || 'Loja Nuvemshop');
};

// Retrieve authentication data from localStorage
export const getAuthData = () => {
  const accessToken = localStorage.getItem('nuvemshop_access_token');
  const userId = localStorage.getItem('nuvemshop_user_id');
  const storeName = localStorage.getItem('nuvemshop_store_name');
  
  return {
    accessToken,
    userId,
    storeName,
    isAuthenticated: !!accessToken && !!userId
  };
};

// Clear all Nuvemshop authentication data from localStorage
export const clearAuthData = () => {
  // Clear specific Nuvemshop auth items
  localStorage.removeItem('nuvemshop_access_token');
  localStorage.removeItem('nuvemshop_user_id');
  localStorage.removeItem('nuvemshop_store_name');
  
  // Clear any other potential cache items
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes('nuvemshop')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  // Limpar cookies relacionados à Nuvemshop (se houver)
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.includes('nuvemshop')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};
