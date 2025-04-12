
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AIFormHeader } from './FormComponents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomDescriptionForm from './CustomDescriptionForm';
import TemplateSelector from './TemplateSelector';

const AIDescriptionForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('custom');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <AIFormHeader />
      
      <Tabs defaultValue="custom" onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="custom">Criar Descrição Personalizada</TabsTrigger>
          <TabsTrigger value="templates">Usar Template Pronto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="custom">
          <CustomDescriptionForm />
        </TabsContent>
        
        <TabsContent value="templates">
          <TemplateSelector isLoading={isLoading} setIsLoading={setIsLoading} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIDescriptionForm;
