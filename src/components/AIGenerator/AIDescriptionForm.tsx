
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editor';
import { AIFormField, AIFormHeader, AISubmitButton } from './FormComponents';
import { generateDescriptionBlocks } from './BlockGeneration/generateBlocks';

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

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <AIFormHeader />
      
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
        />
      </form>
    </Card>
  );
};

export default AIDescriptionForm;
