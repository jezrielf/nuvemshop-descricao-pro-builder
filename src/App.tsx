import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import DescriptionAnalysis from '@/pages/DescriptionAnalysis';
import SEOTechnicalAnalysis from '@/pages/SEOTechnicalAnalysis';

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <BrowserRouter>
          {/* Apply Toaster globally */}
          <Toaster />
          
          {/* Routes configuration */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/description-analysis" element={<DescriptionAnalysis />} />
            
            {/* Add new SEO Technical Analysis route */}
            <Route path="/seo-technical-analysis" element={<SEOTechnicalAnalysis />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
