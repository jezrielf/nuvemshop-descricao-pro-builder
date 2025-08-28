import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Template } from '@/types/editor';
import GlobalErrorBoundary from '@/components/common/GlobalErrorBoundary';

// Lazy load the heavy components
const TemplateBuilderLayout = lazy(() => 
  import('@/components/admin/templates/builder/TemplateBuilderLayout').then(module => ({
    default: module.TemplateBuilderLayout
  }))
);

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
    <GlobalErrorBoundary>
      <div className="h-screen flex flex-col">
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Carregando editor...</p>
            </div>
          </div>
        }>
          <TemplateBuilderLayout 
            template={template}
            onTemplateChange={setTemplate}
            isNewTemplate={!templateId || templateId === 'new'}
          />
        </Suspense>
      </div>
    </GlobalErrorBoundary>
  );
};

export default AdminTemplateBuilder;