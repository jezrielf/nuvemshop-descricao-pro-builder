
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editor';
import { AIFormField, AIFormHeader, AISubmitButton } from './FormComponents';
import { generateDescriptionBlocks } from './BlockGeneration/generateBlocks';
import { generateHealthSupplementTemplate } from './BlockGeneration/HealthSupplement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sparkles, ListChecks } from 'lucide-react';

interface FormData {
  productName: string;
  productDescription: string;
  keyFeatures: string;
  companyInfo: string;
  targetAudience: string;
}

const initialFormData: FormData = {
  productName: '',
  productDescription: '',
  keyFeatures: '',
  companyInfo: '',
  targetAudience: '',
};

const AIDescriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('custom');
  const { toast } = useToast();
  const { isPremium } = useAuth();
  const { description, addBlock } = useEditorStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      // Here we would normally call an API to generate the description
      // For now, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate blocks based on the form data
        generateDescriptionBlocks(formData, addBlock);
        
        // Reset form and show success message
        setFormData(initialFormData);
        toast({
          title: "Descrição gerada com sucesso!",
          description: "Os blocos foram adicionados à sua descrição.",
        });
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        title: "Erro ao gerar descrição",
        description: "Ocorreu um erro ao gerar a descrição. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Create a handler that doesn't require the event parameter
  const handleGenerateClick = () => {
    // Create a synthetic event to pass to handleSubmit
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(syntheticEvent);
  };

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
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <AIFormHeader />
      
      <Tabs defaultValue="custom" onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="custom">Criar Descrição Personalizada</TabsTrigger>
          <TabsTrigger value="templates">Usar Template Pronto</TabsTrigger>
        </TabsList>
        
        <TabsContent value="custom">
          <p className="text-violet-700 mb-6">
            Forneça informações sobre seu produto e nossa IA irá criar uma descrição completa e atraente.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <AIFormField
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              label="Nome do Produto"
              placeholder="Ex: Câmera Digital XYZ Pro"
              required
              minHeight="min-h-9"
            />
            
            <AIFormField
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              label="Descrição do Produto"
              placeholder="Descreva o que é o produto e para que serve..."
              required
              minHeight="min-h-24"
            />
            
            <AIFormField
              id="keyFeatures"
              name="keyFeatures"
              value={formData.keyFeatures}
              onChange={handleChange}
              label="Características Principais (uma por linha)"
              placeholder="Ex: Resolução 4K&#10;Resistente à água&#10;Bateria de longa duração"
              required
              minHeight="min-h-24"
            />
            
            <AIFormField
              id="companyInfo"
              name="companyInfo"
              value={formData.companyInfo}
              onChange={handleChange}
              label="Informações da Empresa"
              placeholder="Informações sobre a empresa, história, valores..."
              minHeight="min-h-20"
            />
            
            <AIFormField
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              label="Público-alvo"
              placeholder="Quem é o cliente ideal para este produto?"
              minHeight="min-h-20"
            />
            
            <AISubmitButton 
              isLoading={isLoading}
              isPremium={isPremium()}
              onClick={handleGenerateClick}
            />
          </form>
        </TabsContent>
        
        <TabsContent value="templates">
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
                src="public/lovable-uploads/173953f8-2412-4deb-a922-fd45db85f37f.png" 
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
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIDescriptionForm;
