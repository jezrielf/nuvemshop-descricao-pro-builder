
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ArrowRight, PlusCircle, ImagePlus, KeyRound, Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ContentRecommendation, 
  getContentRecommendations, 
  generateContentSuggestion,
  getSuggestedKeywords
} from '@/utils/aiGenerators/contentRecommender';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ 
  description,
  isOpen,
  onOpenChange
}) => {
  // Use internal state if external state is not provided
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [contentSuggestion, setContentSuggestion] = useState<string>('');
  const [contentLoading, setContentLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [productType, setProductType] = useState('');
  
  // Use either the provided external state or internal state
  const isDialogOpen = isOpen !== undefined ? isOpen : internalOpen;
  const handleOpenChange = onOpenChange || setInternalOpen;
  
  useEffect(() => {
    if (isDialogOpen && description) {
      loadRecommendations();
    }
  }, [isDialogOpen, description]);
  
  const loadRecommendations = async () => {
    if (!description) return;
    
    setLoading(true);
    try {
      // Get product type from description or default to empty string
      const type = description.metadata?.industry || description.metadata?.category || '';
      setProductType(type);
      
      const recs = await getContentRecommendations(description, type);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateContent = async () => {
    if (!description) return;
    
    setContentLoading(true);
    try {
      const type = productType || description.metadata?.industry || description.metadata?.category || '';
      const name = description.title || 'Produto';
      
      const content = await generateContentSuggestion(type, name);
      setContentSuggestion(content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setContentLoading(false);
    }
  };
  
  const loadKeywords = async () => {
    if (!description) return;
    
    setKeywordsLoading(true);
    try {
      const type = productType || description.metadata?.industry || description.metadata?.category || '';
      const name = description.title || 'Produto';
      
      const suggestionKeywords = await getSuggestedKeywords(type, name);
      setKeywords(suggestionKeywords);
    } catch (error) {
      console.error('Error loading keywords:', error);
    } finally {
      setKeywordsLoading(false);
    }
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <span className="w-full">Recomendações de IA</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            Recomendações de Conteúdo
          </DialogTitle>
          <DialogDescription>
            Sugestões inteligentes para melhorar sua descrição de produto
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              {loading ? (
                <div className="space-y-4 p-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="border rounded-md p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                  ))}
                </div>
              ) : recommendations.length > 0 ? (
                <div className="space-y-4 p-2">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge 
                          variant="outline"
                          className={
                            rec.confidence > 80 ? "bg-green-100 text-green-800" :
                            rec.confidence > 60 ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100"
                          }
                        >
                          {rec.confidence}% confiança
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      {rec.action && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs"
                        >
                          {rec.action.type === 'add' && <PlusCircle className="h-3 w-3 mr-1" />}
                          {rec.action.type === 'replace' && <ArrowRight className="h-3 w-3 mr-1" />}
                          {rec.action.type === 'update' && <PlusCircle className="h-3 w-3 mr-1" />}
                          Aplicar recomendação
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 p-4">
                  <Lightbulb className="h-12 w-12 text-yellow-500 mb-4 opacity-50" />
                  <h3 className="font-medium text-lg mb-1">Nenhuma recomendação encontrada</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Adicione mais conteúdo à sua descrição para receber recomendações personalizadas.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={loadRecommendations}
                  >
                    Analisar novamente
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="content" className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Sugestão de conteúdo</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={generateContent}
                  disabled={contentLoading}
                >
                  <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                  {contentLoading ? 'Gerando...' : 'Gerar conteúdo'}
                </Button>
              </div>
              
              <div className="mt-4 border rounded-md p-4 min-h-40 bg-gray-50">
                {contentLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : contentSuggestion ? (
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentSuggestion }}
                  />
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Clique no botão "Gerar conteúdo" para obter uma sugestão para sua descrição
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="keywords" className="flex-1 overflow-hidden flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Palavras-chave sugeridas</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={loadKeywords}
                  disabled={keywordsLoading}
                >
                  <KeyRound className="h-3 w-3 mr-1" />
                  {keywordsLoading ? 'Carregando...' : 'Gerar palavras-chave'}
                </Button>
              </div>
              
              <div className="mt-4 min-h-40">
                {keywordsLoading ? (
                  <div className="flex flex-wrap gap-2">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                ) : keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8 border rounded-md">
                    Clique em "Gerar palavras-chave" para obter sugestões para sua descrição
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentRecommender;
