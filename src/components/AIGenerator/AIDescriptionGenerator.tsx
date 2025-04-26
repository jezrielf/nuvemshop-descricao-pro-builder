
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Loader2, Upload, Image, LucideProps } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import AIGeneratorResult from './AIGeneratorResult';
import { ProductCategory, ProductDescription, Block, BlockType } from '@/types/editor';
import { isPremium } from '@/utils/roleUtils';

// Rename the function to match what's expected in the imports
import { generateAIDescription as generateDescription } from '@/utils/aiGenerators/descriptionGenerator';

// Form schema for AI description generation
const formSchema = z.object({
  productName: z.string().min(2, { message: 'Nome do produto é obrigatório' }),
  productCategory: z.string(),
  productPrice: z.string().optional(),
  companyInfo: z.string().min(10, { message: 'Informações da empresa são obrigatórias' }),
  targetAudience: z.string().min(10, { message: 'Informações do público-alvo são obrigatórias' }),
  mainFeatures: z.string().min(10, { message: 'Diferenciais do produto são obrigatórios' }),
  additionalInfo: z.string().optional(),
  tone: z.enum(['formal', 'casual', 'professional', 'enthusiastic']).default('professional'),
  imageUrl: z.string().optional(),
});

// Fix the type for tone to match what's expected
type ToneType = 'formal' | 'casual' | 'professional' | 'enthusiastic';

interface AIDescriptionGeneratorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIDescriptionGenerator: React.FC<AIDescriptionGeneratorProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  const { isBusiness, profile } = useAuth();
  const navigate = useNavigate();
  const { createNewDescription, loadDescription } = useEditorStore();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<ProductDescription | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productCategory: 'other',
      productPrice: '',
      companyInfo: '',
      targetAudience: '',
      mainFeatures: '',
      additionalInfo: '',
      tone: 'professional',
      imageUrl: '',
    },
  });

  // If not premium, redirect to plans page
  if (!isPremium(profile?.role) && !isBusiness()) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Recurso Premium</DialogTitle>
            <DialogDescription>
              O gerador de descrição por IA é exclusivo para assinantes premium ou empresarial.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <Sparkles className="h-12 w-12 text-yellow-500 mb-4" />
            <p className="text-center mb-4">
              Desbloqueie o poder da IA para gerar descrições completas e profissionais com apenas algumas informações.
            </p>
            <Button onClick={() => {
              onOpenChange(false);
              navigate('/plans');
            }}>
              Ver Planos Premium
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setUploadedImageUrl(imageUrl);
        form.setValue('imageUrl', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      // Fix: Convert tone value to the correct type explicitly 
      const toneValue = values.tone as ToneType;

      // Use renamed function with correct parameters
      const description = await generateDescription({
        productName: values.productName,                 
        productCategory: values.productCategory,         
        productPrice: values.productPrice,               
        companyInfo: values.companyInfo,                 
        targetAudience: values.targetAudience,           
        mainFeatures: values.mainFeatures,               
        additionalInfo: values.additionalInfo,           
        tone: toneValue,                               
        imageUrl: uploadedImageUrl || undefined,         
      });
      
      setGeneratedDescription(description);
      
      toast({
        title: "Descrição gerada com sucesso",
        description: "Revise e aplique a descrição gerada para o seu produto",
      });
    } catch (error) {
      console.error("Erro ao gerar descrição:", error);
      toast({
        title: "Erro ao gerar descrição",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyDescription = () => {
    if (generatedDescription) {
      loadDescription(generatedDescription);
      onOpenChange(false);
      toast({
        title: "Descrição aplicada",
        description: "A descrição gerada foi aplicada com sucesso ao editor",
      });
    }
  };
  
  const resetGenerator = () => {
    setGeneratedDescription(null);
    form.reset();
    setUploadedImageUrl(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Reset state when closing the dialog
      if (!open) {
        resetGenerator();
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
            Gerador de Descrição Completa com IA
          </DialogTitle>
          <DialogDescription>
            Forneça informações sobre seu produto e empresa para gerar uma descrição profissional completa.
          </DialogDescription>
        </DialogHeader>

        {!generatedDescription ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="style">Estilo e Mídia</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Produto*</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Cafeteira Elétrica Premium" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="productCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <select
                              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="supplements">Suplementos</option>
                              <option value="clothing">Vestuário</option>
                              <option value="accessories">Acessórios</option>
                              <option value="shoes">Calçados</option>
                              <option value="electronics">Eletrônicos</option>
                              <option value="energy">Energia</option>
                              <option value="other">Outro</option>
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: R$ 299,90" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="companyInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobre a Empresa*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva sua empresa, missão, valores e tempo no mercado" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Público-Alvo*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva quem são seus clientes ideais, faixa etária, interesses, necessidades" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="mainFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principais Características e Diferenciais*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Liste os principais benefícios, características e diferenciais do seu produto" 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informações Adicionais (opcional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Especificações técnicas, garantia, certificações, história do produto, etc." 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tom da Descrição</FormLabel>
                        <FormControl>
                          <select
                            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="professional">Profissional</option>
                            <option value="formal">Formal</option>
                            <option value="casual">Casual</option>
                            <option value="enthusiastic">Entusiasta</option>
                          </select>
                        </FormControl>
                        <FormDescription>
                          Escolha o estilo de comunicação para a descrição gerada
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <Label>Imagem do Produto (opcional)</Label>
                    <Card className="p-4">
                      {uploadedImageUrl ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="relative w-full max-h-48 overflow-hidden flex justify-center items-center border rounded-md">
                            <img 
                              src={uploadedImageUrl} 
                              alt="Preview" 
                              className="max-h-48 object-contain" 
                            />
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setUploadedImageUrl(null);
                              form.setValue('imageUrl', '');
                            }}
                          >
                            Remover Imagem
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full flex flex-col items-center justify-center">
                            <Image className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Arraste uma imagem ou clique para fazer upload
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              PNG, JPG ou WEBP até 5MB
                            </p>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="image-upload"
                            onChange={handleImageUpload}
                          />
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <Button variant="outline" size="sm" type="button" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                Escolher Imagem
                              </span>
                            </Button>
                          </Label>
                        </div>
                      )}
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Gerar Descrição Completa
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <AIGeneratorResult 
            description={generatedDescription}
            onApply={handleApplyDescription}
            onReset={resetGenerator}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIDescriptionGenerator;
