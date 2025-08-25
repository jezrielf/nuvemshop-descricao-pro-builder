
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useEditorStore } from '@/store/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { calculateReadabilityMetrics } from '@/components/SEO/utils/seoUtils';
import { extractHeaderStructure, analyzeContentStructure } from '@/components/SEO/utils/structureUtils';
import { HeadingStructureTab } from './tabs/HeadingStructureTab';
import { KeywordDistributionTab } from './tabs/KeywordDistributionTab';
import { ContentQualityTab } from './tabs/ContentQualityTab';
import { TechnicalTab } from './tabs/TechnicalTab';
import { ReadabilityTab } from './tabs/ReadabilityTab';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useProductDescriptionSaver } from '@/components/Nuvemshop/hooks/useProductDescriptionSaver';
import { HeadingStructure, HeadingSuggestion } from './types/headingTypes';
import { useHeadingsUpdater } from '@/components/Nuvemshop/hooks/useHeadingsUpdater';
import { ProductDescription } from '@/types/editor';
import { useNuvemshopStore } from '@/contexts/NuvemshopStoreContext';

interface SEOTechnicalDiagnosticProps {
  description?: ProductDescription;
}

export const SEOTechnicalDiagnostic: React.FC<SEOTechnicalDiagnosticProps> = ({ description: propDescription }) => {
  const { description: storeDescription } = useEditorStore();
  const description = propDescription || storeDescription;
  
  const [activeTab, setActiveTab] = useState('structure');
  const { activeStoreId } = useNuvemshopStore();
  const { handleSaveToNuvemshop } = useProductDescriptionSaver(activeStoreId);

  if (!description) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
        <h3 className="text-lg font-medium mb-2">Nenhuma descrição carregada</h3>
        <p className="text-muted-foreground mb-4">
          Abra uma descrição para visualizar o diagnóstico técnico de SEO.
        </p>
      </div>
    );
  }

  // Extract product ID and title if the description name follows the pattern "Descrição: Product Name"
  const productTitle = description?.name?.startsWith('Descrição:') 
    ? description.name.substring(10).trim()
    : undefined;
    
  // Safely access metadata properties
  const productId = description?.metadata?.productId 
    ? Number(description.metadata.productId)
    : undefined;

  const content = getTextContentFromDescription(description);
  const readabilityMetrics = calculateReadabilityMetrics(content);
  const headingStructure = extractHeaderStructure(description) as HeadingStructure;
  const contentStructure = analyzeContentStructure(description);

  // Calculate overall SEO score based on various factors
  const calculateOverallScore = () => {
    let score = 60; // Base score
    
    // Content length score
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    if (wordCount > 100) score += 5;
    if (wordCount > 300) score += 10;
    if (wordCount > 500) score += 5;
    
    // Heading structure score
    if (headingStructure.hasValidH1) score += 10;
    if (headingStructure.hasProperHierarchy) score += 5;
    if (headingStructure.count > 2) score += 5;
    
    // Readability score component
    const readabilityScore = Math.min(100 - Math.abs(readabilityMetrics.averageSentenceLength - 15) * 2, 20);
    score += readabilityScore;
    
    // Content structure score
    if (contentStructure.hasImages) score += 5;
    if (contentStructure.sectionCount > 2) score += 5;
    
    return Math.min(score, 100);
  };

  const overallScore = calculateOverallScore();

  // Handler for updating headings in the description
  const { applyHeadingChanges, isUpdating } = useHeadingsUpdater();
  
  const handleUpdateHeadings = async (suggestedHeadings: HeadingSuggestion[]): Promise<boolean> => {
    if (!description) return false;
    
    try {
      console.log("Atualizando estrutura de headings:", suggestedHeadings);
      // Pass the product title to handle H1 correctly
      return await applyHeadingChanges(suggestedHeadings, productTitle);
    } catch (error) {
      console.error("Erro ao atualizar headings:", error);
      return false;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Diagnóstico Técnico SEO</h2>
          <p className="text-muted-foreground">
            Análise detalhada dos aspectos técnicos de SEO da descrição do produto.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Pontuação Geral</p>
            <p className="text-2xl font-bold">{overallScore}/100</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-14 h-14">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={`hsl(${overallScore}, 70%, 50%)`}
                strokeWidth="3"
                strokeDasharray={`${overallScore}, 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="structure">Estrutura</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="technical">Técnico</TabsTrigger>
          <TabsTrigger value="readability">Legibilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          <HeadingStructureTab 
            headingStructure={headingStructure} 
            currentProductTitle={productTitle}
            productId={productId}
            onUpdateHeadings={handleUpdateHeadings}
          />
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <KeywordDistributionTab description={description} />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentQualityTab contentStructure={contentStructure} description={description} />
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <TechnicalTab description={description} />
        </TabsContent>

        <TabsContent value="readability" className="space-y-4">
          <ReadabilityTab metrics={readabilityMetrics} content={content} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOTechnicalDiagnostic;
