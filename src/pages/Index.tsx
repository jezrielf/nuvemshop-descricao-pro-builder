
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { useTemplateStore } from '@/store/templateStore';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

// Adicionamos o diretório public/tutorial para as imagens do tutorial
const placeholderImages = [
  '/tutorial/welcome.png',
  '/tutorial/add-blocks.png',
  '/tutorial/templates.png',
  '/tutorial/customize.png',
  '/tutorial/preview.png',
  '/tutorial/export.png'
];

const Index = () => {
  const { loadTemplates } = useTemplateStore();
  
  useEffect(() => {
    // Carrega os templates iniciais
    loadTemplates();
    
    // Pré-carrega as imagens do tutorial
    placeholderImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [loadTemplates]);
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} minSize={30} className="editor-area">
            <Editor />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30} className="preview-area">
            <Preview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
