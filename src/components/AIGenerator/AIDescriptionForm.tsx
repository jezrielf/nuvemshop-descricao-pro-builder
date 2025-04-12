
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEditorStore } from '@/store/editor';
import { createBlock } from '@/utils/blockCreators';
import { ProductDescription } from '@/types/editor';

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
  const { description, loadDescription, addBlock } = useEditorStore();

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
      // Prepare the prompt for the AI
      const prompt = `
        Produto: ${formData.productName}
        Descrição: ${formData.productDescription}
        Principais características: ${formData.keyFeatures}
        Informações da empresa: ${formData.companyInfo}
        Público-alvo: ${formData.targetAudience}
      `;

      // Here we would normally call an API to generate the description
      // For now, we'll simulate an API call with setTimeout
      setTimeout(() => {
        // Generate blocks based on the form data
        generateDescriptionBlocks();
        
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

  const generateDescriptionBlocks = () => {
    // Example blocks that would be generated based on the form data
    
    // Hero block
    const heroBlock = createBlock('hero', 1);
    if (heroBlock && heroBlock.type === 'hero') {
      heroBlock.heading = formData.productName;
      heroBlock.subheading = `A melhor escolha para ${formData.targetAudience}`;
      addBlock(heroBlock);
    }
    
    // Text block for product description
    const textBlock = createBlock('text', 1);
    if (textBlock && textBlock.type === 'text') {
      textBlock.heading = 'Sobre o Produto';
      textBlock.content = `<p>${formData.productDescription}</p>`;
      addBlock(textBlock);
    }
    
    // Features block
    const featuresData = formData.keyFeatures.split('\n').filter(f => f.trim());
    if (featuresData.length > 0) {
      const featuresBlock = createBlock('features', 2);
      if (featuresBlock && featuresBlock.type === 'features') {
        featuresBlock.heading = 'Recursos Principais';
        featuresBlock.features = featuresData.map((feature, index) => ({
          id: `feature-${index}`,
          title: feature.trim(),
          description: 'Descrição do recurso.',
          icon: 'zap'
        }));
        addBlock(featuresBlock);
      }
    }
    
    // Company info as text block
    if (formData.companyInfo.trim()) {
      const companyBlock = createBlock('text', 1);
      if (companyBlock && companyBlock.type === 'text') {
        companyBlock.heading = 'Sobre a Empresa';
        companyBlock.content = `<p>${formData.companyInfo}</p>`;
        addBlock(companyBlock);
      }
    }
    
    // CTA block
    const ctaBlock = createBlock('cta', 1);
    if (ctaBlock && ctaBlock.type === 'cta') {
      ctaBlock.heading = 'Interessado em nosso produto?';
      ctaBlock.content = '<p>Entre em contato conosco para saber mais ou realizar um pedido.</p>';
      ctaBlock.buttonText = 'Fale Conosco';
      addBlock(ctaBlock);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-violet-600" />
        <h2 className="text-xl font-semibold text-violet-900">Gerador de Descrição com IA</h2>
      </div>
      
      <p className="text-violet-700 mb-6">
        Forneça informações sobre seu produto e nossa IA irá criar uma descrição completa e atraente.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-violet-800 mb-1">
            Nome do Produto
          </label>
          <Textarea
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Ex: Câmera Digital XYZ Pro"
            required
            className="min-h-9"
          />
        </div>
        
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-violet-800 mb-1">
            Descrição do Produto
          </label>
          <Textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            placeholder="Descreva o que é o produto e para que serve..."
            required
            className="min-h-24"
          />
        </div>
        
        <div>
          <label htmlFor="keyFeatures" className="block text-sm font-medium text-violet-800 mb-1">
            Características Principais (uma por linha)
          </label>
          <Textarea
            id="keyFeatures"
            name="keyFeatures"
            value={formData.keyFeatures}
            onChange={handleChange}
            placeholder="Ex: Resolução 4K&#10;Resistente à água&#10;Bateria de longa duração"
            required
            className="min-h-24"
          />
        </div>
        
        <div>
          <label htmlFor="companyInfo" className="block text-sm font-medium text-violet-800 mb-1">
            Informações da Empresa
          </label>
          <Textarea
            id="companyInfo"
            name="companyInfo"
            value={formData.companyInfo}
            onChange={handleChange}
            placeholder="Informações sobre a empresa, história, valores..."
            className="min-h-20"
          />
        </div>
        
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-violet-800 mb-1">
            Público-alvo
          </label>
          <Textarea
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Quem é o cliente ideal para este produto?"
            className="min-h-20"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading || !isPremium()}
          className="w-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Gerando Descrição...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Gerar Descrição com IA
            </>
          )}
        </Button>
        
        {!isPremium() && (
          <p className="text-amber-600 text-center text-sm">
            Este recurso está disponível apenas para usuários premium.
          </p>
        )}
      </form>
    </Card>
  );
};

export default AIDescriptionForm;
