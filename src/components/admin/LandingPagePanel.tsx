
import React from 'react';
import LandingPageImageManager from './LandingPageImageManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LandingPagePanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editor da Landing Page</h1>
      
      <Tabs defaultValue="images" className="space-y-4">
        <TabsList>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <LandingPageImageManager />
        </TabsContent>

        <TabsContent value="content">
          <div className="text-muted-foreground">
            Seção de edição de conteúdo em desenvolvimento...
          </div>
        </TabsContent>

        <TabsContent value="style">
          <div className="text-muted-foreground">
            Seção de personalização de estilo em desenvolvimento...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPagePanel;
