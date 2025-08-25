
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import EmailConfirmation from './pages/EmailConfirmation';
import DescriptionAnalysis from './pages/DescriptionAnalysis';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import AdminTemplates from './pages/AdminTemplates';
import Plans from './pages/Plans';
import NuvemshopConnect from './pages/NuvemshopConnect';
import NexoAdmin from './pages/NexoAdmin';
// import NimbusNexoInfo from './pages/NimbusNexoInfo'; // Página desativada
import Success from './pages/Success';
import Landing from './pages/Landing';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NimbusProvider } from './components/Nuvemshop/NimbusProvider';
import NexoProvider from './components/Nuvemshop/NexoProvider';
import { 
  isEmbeddedInNuvemshop, 
  registerWithNuvemshopRouter, 
  logEmbeddedEnvironmentInfo 
} from './components/Nuvemshop/utils/embedUtils';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isEmbedded, setIsEmbedded] = React.useState<boolean>(false);
  
  // Check if app is embedded on mount and register with Nuvemshop if needed
  React.useEffect(() => {
    const embedded = isEmbeddedInNuvemshop();
    setIsEmbedded(embedded);
    
    if (embedded) {
      console.log('[App] Running in embedded Nuvemshop mode');
      logEmbeddedEnvironmentInfo();
      registerWithNuvemshopRouter();
      
      // Add manifest link if not present
      if (!document.querySelector('link[rel="manifest"]')) {
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = '/manifest.json';
        document.head.appendChild(manifestLink);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <NimbusProvider>
            <NexoProvider>
              <Routes>
                {/* Redirect to NexoAdmin directly when embedded in Nuvemshop */}
                {isEmbedded && <Route path="/" element={<Navigate to="/nexo-admin" replace />} />}
                {isEmbedded && <Route path="/editor" element={<Navigate to="/nexo-admin" replace />} />}
                
                {/* Regular routes */}
                {!isEmbedded && <Route path="/" element={<Landing />} />}
                {!isEmbedded && <Route path="/editor" element={<Index />} />}
                <Route path="/auth" element={<Auth />} />
                <Route path="/confirmar-email" element={<EmailConfirmation />} />
                <Route path="/description-analysis" element={<DescriptionAnalysis />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin-auth" element={<AdminAuth />} />
                <Route path="/admin-templates" element={<AdminTemplates />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/nuvemshop-connect" element={<NuvemshopConnect />} />
                <Route path="/nexo-admin" element={<NexoAdmin />} />
                {/* Rota desativada: <Route path="/nimbus-nexo-info" element={<NimbusNexoInfo />} /> */}
                <Route path="/success" element={<Success />} />
              </Routes>
            </NexoProvider>
          </NimbusProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
