
import { useState, useEffect } from 'react';
import { useNimbusUI } from '../NimbusProvider';

export const useNimbusPreferences = () => {
  const { useNimbusUI, toggleNimbusUI } = useNimbusUI();
  
  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('nimbus_ui_enabled');
    if (savedPreference === 'true' && !useNimbusUI) {
      toggleNimbusUI();
    }
  }, []);
  
  // Save preference whenever it changes
  useEffect(() => {
    localStorage.setItem('nimbus_ui_enabled', useNimbusUI.toString());
  }, [useNimbusUI]);

  return {
    isNimbusUIActive: useNimbusUI,
    toggleNimbusUI
  };
};
