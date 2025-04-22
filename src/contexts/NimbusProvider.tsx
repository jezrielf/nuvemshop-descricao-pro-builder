
import React from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';

interface NimbusProviderProps {
  children: React.ReactNode;
}

export const NimbusProvider: React.FC<NimbusProviderProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="describot-theme">
      <div className="nimbus-ui nimbus-design-system">
        {children}
      </div>
    </ThemeProvider>
  );
};
