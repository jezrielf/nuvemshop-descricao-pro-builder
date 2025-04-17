
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { getContentRecommendations, ContentRecommendation } from '@/utils/aiGenerators/contentRecommender';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  const { toast } = useToast();
  
  const loadRecommendations = async () => {
    if (!description) {
      toast({
        title: "Sem descrição",
        description: "É necessário ter uma descrição para gerar recomendações",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const data = await getContentRecommendations(description);
      setRecommendations(data);
    } catch (error) {
      toast({
        title: "Erro ao gerar recomendações",
        description: "Não foi possível gerar recomendações neste momento",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && description && recommendations.length === 0) {
      loadRecommendations();
    }
  }, [open, description]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="w-full text-left py-1.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={handleClick}
        >
          Recomendações IA
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col overflow-hidden p-3">
        <DialogHeader className="pb-2">
          <DialogTitle>Recomendações de Conteúdo</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : recommendations.length > 0 ? (
          <ScrollArea className="flex-grow pr-2">
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="border shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{rec.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {rec.confidence}%
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                        {rec.action && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 p-0 h-auto text-xs text-blue-600 hover:text-blue-800"
                          >
                            Aplicar sugestão
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium">Sem recomendações disponíveis</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {!description 
                ? "Crie uma descrição para obter recomendações" 
                : "Não foi possível gerar recomendações"}
            </p>
            {description && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={loadRecommendations}
              >
                Tentar novamente
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIContentRecommender;
