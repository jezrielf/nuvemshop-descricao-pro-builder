
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import DescriptionAnalysis from './pages/DescriptionAnalysis';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import AdminTemplates from './pages/AdminTemplates';
import Plans from './pages/Plans';
import NuvemshopConnect from './pages/NuvemshopConnect';
import NexoAdmin from './pages/NexoAdmin';
import NimbusNexoInfo from './pages/NimbusNexoInfo';
import Success from './pages/Success';
import Landing from './pages/Landing';
import NimbusDemo from './pages/NimbusDemo';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NimbusProvider } from './components/Nuvemshop/NimbusProvider';
import NexoProvider from './components/Nuvemshop/NexoProvider';
import { isEmbeddedInNuvemshop } from './components/Nuvemshop/utils/embedUtils';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);
  
  // Check if app is embedded on mount
  useEffect(() => {
    const embedded = isEmbeddedInNuvemshop();
    setIsEmbedded(embedded);
    
    if (embedded) {
      console.log('[App] Running in embedded Nuvemshop mode');
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <NimbusProvider>
              <NexoProvider>
                <Routes>
                  {/* Redirect to NexoAdmin directly when embedded in Nuvemshop */}
                  {isEmbedded && <Route path="/" element={<Navigate to="/nexo-admin" replace />} />}
                  
                  {/* Regular routes */}
                  {!isEmbedded && <Route path="/" element={<Landing />} />}
                  <Route path="/editor" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/description-analysis" element={<DescriptionAnalysis />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin-auth" element={<AdminAuth />} />
                  <Route path="/admin-templates" element={<AdminTemplates />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/nuvemshop-connect" element={<NuvemshopConnect />} />
                  <Route path="/nexo-admin" element={<NexoAdmin />} />
                  <Route path="/nimbus-nexo-info" element={<NimbusNexoInfo />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/nimbus" element={<NimbusDemo />} />
                </Routes>
              </NexoProvider>
            </NimbusProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
