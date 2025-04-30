
import { useState, useEffect } from 'react';
import { useNimbusUI } from '../NimbusProvider';

export const useNimbusPreferences = () => {
  const { useNimbusUI: isNimbusUIActive, toggleNimbusUI } = useNimbusUI();
  
  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('nimbus_ui_enabled');
    if (savedPreference === 'true' && !isNimbusUIActive) {
      toggleNimbusUI();
    }
  }, []);
  
  // Save preference whenever it changes
  useEffect(() => {
    localStorage.setItem('nimbus_ui_enabled', isNimbusUIActive.toString());
  }, [isNimbusUIActive]);

  return {
    isNimbusUIActive,
    toggleNimbusUI
  };
};
