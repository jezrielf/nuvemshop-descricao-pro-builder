
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import DescriptionAnalysis from './pages/DescriptionAnalysis';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import AdminTemplates from './pages/AdminTemplates';
import Plans from './pages/Plans';
import NuvemshopConnect from './pages/NuvemshopConnect';
import Success from './pages/Success';
import Landing from './pages/Landing';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/editor" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/description-analysis" element={<DescriptionAnalysis />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path="/admin-templates" element={<AdminTemplates />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/nuvemshop-connect" element={<NuvemshopConnect />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
