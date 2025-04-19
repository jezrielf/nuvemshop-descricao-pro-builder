
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import DescriptionAnalysis from './pages/DescriptionAnalysis';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import AdminTemplates from './pages/AdminTemplates';
import Plans from './pages/Plans';
import NuvemshopAuth from './pages/NuvemshopAuth';
import NuvemshopProducts from './pages/NuvemshopProducts';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/description-analysis" element={<DescriptionAnalysis />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/admin-templates" element={<AdminTemplates />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/nuvemshop-auth" element={<NuvemshopAuth />} />
        <Route path="/nuvemshop-products" element={<NuvemshopProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
