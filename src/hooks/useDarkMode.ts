
import { useState, useEffect } from 'react';

export const useDarkMode = (storageKey: string = 'darkMode') => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem(storageKey);
    return savedPreference === 'true';
  });

  useEffect(() => {
    // Apply dark mode class to the document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem(storageKey, darkMode ? 'true' : 'false');
  }, [darkMode, storageKey]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
};
