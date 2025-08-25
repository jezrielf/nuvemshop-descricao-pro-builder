import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TemplateBuilderLayout } from '@/components/admin/templates/builder/TemplateBuilderLayout';
import { useToast } from '@/hooks/use-toast';
import { Template } from '@/types/editor';

const AdminTemplateBuilder: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template | null>(null);
  const navigate = useNavigate();
  const { templateId } = useParams<{ templateId?: string }>();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth !== 'true') {
      navigate('/admin-auth');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [navigate]);
  
  useEffect(() => {
    // Load template if editing
    if (templateId && templateId !== 'new') {
      // TODO: Load template from store
      console.log('Loading template:', templateId);
    }
  }, [templateId]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Acesso negado</div>;
  }
  
  return (
    <div className="h-screen flex flex-col">
      <TemplateBuilderLayout 
        template={template}
        onTemplateChange={setTemplate}
        isNewTemplate={!templateId || templateId === 'new'}
      />
    </div>
  );
};

export default AdminTemplateBuilder;