
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import DescriptionAnalysis from '@/pages/DescriptionAnalysis';
import SEOTechnicalAnalysis from '@/pages/SEOTechnicalAnalysis';
import Admin from '@/pages/Admin';
import AdminTemplates from '@/pages/AdminTemplates';
import AdminAuth from '@/pages/AdminAuth';

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
            <Route path="/seo-technical-analysis" element={<SEOTechnicalAnalysis />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-templates" element={<AdminTemplates />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
