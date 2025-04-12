
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Sparkles, ListChecks } from 'lucide-react';
import { generateHealthSupplementTemplate } from './BlockGeneration/HealthSupplement';

interface TemplateSelectorProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ isLoading, setIsLoading }) => {
  const { toast } = useToast();
  const { isPremium } = useAuth();
  const { description, addBlock } = useEditorStore();

  // Handler for the template selection
  const handleGenerateTemplate = (templateType: string) => {
    if (!isPremium()) {
      toast({
        title: "Recurso Premium",
        description: "Este recurso está disponível apenas para usuários premium.",
        variant: "destructive",
      });
      return;
    }
    
    if (!description) {
      toast({
        title: "Sem descrição ativa",
        description: "Por favor, crie ou selecione uma descrição antes de usar o gerador de IA.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      setTimeout(() => {
        // Generate the health supplement template
        if (templateType === 'health') {
          generateHealthSupplementTemplate(addBlock);
        }
        
        toast({
          title: "Template gerado com sucesso!",
          description: "O template de suplemento foi adicionado à sua descrição.",
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating template:', error);
      toast({
        title: "Erro ao gerar template",
        description: "Ocorreu um erro ao gerar o template. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="text-violet-700 mb-6">
        Escolha um template pré-definido para gerar uma descrição completa e profissional instantaneamente.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 hover:border-violet-300 transition-all cursor-pointer bg-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-lg text-violet-800">Protocolo Saúde e Bem-estar</h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Suplementos</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Template completo para produtos de saúde e suplementos alimentares, com seções de benefícios, componentes e garantias.
          </p>
          <img 
            src="/lovable-uploads/173953f8-2412-4deb-a922-fd45db85f37f.png" 
            alt="Template Saúde e Bem-estar" 
            className="w-full h-32 object-cover rounded-md mb-4"
          />
          <Button 
            onClick={() => handleGenerateTemplate('health')}
            disabled={isLoading || !isPremium()}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                <span>Gerando template...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Usar este template</span>
              </div>
            )}
          </Button>
        </div>
        
        <div className="border rounded-lg p-4 hover:border-violet-300 transition-all cursor-pointer bg-white opacity-50">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-lg text-violet-800">Mais templates em breve</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Em desenvolvimento</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Estamos trabalhando em novos templates para diferentes categorias de produtos. Fique atento às novidades!
          </p>
          <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center mb-4">
            <ListChecks className="h-12 w-12 text-gray-400" />
          </div>
          <Button 
            disabled={true}
            className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
          >
            Em breve
          </Button>
        </div>
      </div>
    </>
  );
};

export default TemplateSelector;
