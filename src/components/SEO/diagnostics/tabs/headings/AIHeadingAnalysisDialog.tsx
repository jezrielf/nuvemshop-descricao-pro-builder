
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check, AlertTriangle, X, ThumbsUp, ThumbsDown, Brain } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIHeadingAnalysis } from '../../hooks/useAIHeadingAnalysis';
import { HeadingStructure } from '../../types/headingTypes';

interface AIHeadingAnalysisDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAnalyzing: boolean;
  analysis: AIHeadingAnalysis | null;
  onAnalyze: () => void;
  onApplySuggestions: () => void;
  onApplyAutoCorrection: () => void;
  headingStructure: HeadingStructure;
  currentProductTitle?: string;
}

export const AIHeadingAnalysisDialog: React.FC<AIHeadingAnalysisDialogProps> = ({
  isOpen,
  onOpenChange,
  isAnalyzing,
  analysis,
  onAnalyze,
  onApplySuggestions,
  onApplyAutoCorrection,
  headingStructure,
  currentProductTitle
}) => {
  // Function to render strength/weakness items with appropriate icons
  const renderListItems = (items: string[], type: 'strength' | 'weakness') => {
    return items.map((item, index) => (
      <li key={index} className="flex items-start gap-2 mb-2">
        {type === 'strength' ? (
          <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
        )}
        <span>{item}</span>
      </li>
    ));
  };

  // Function to render SEO score with color gradient
  const renderSeoScore = (score: number) => {
    let colorClass = "text-red-500";
    if (score >= 80) colorClass = "text-green-500";
    else if (score >= 60) colorClass = "text-yellow-500";
    else if (score >= 40) colorClass = "text-amber-500";
    
    return <span className={`text-xl font-bold ${colorClass}`}>{score}/100</span>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Análise Avançada de Headings com IA
          </DialogTitle>
          <DialogDescription>
            Análise profunda da estrutura de headings com recomendações baseadas em inteligência artificial.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-center text-lg font-medium mb-2">Analisando estrutura de headings...</p>
              <p className="text-center text-muted-foreground">
                A IA está processando sua estrutura e gerando recomendações personalizadas.
              </p>
            </div>
          ) : !analysis ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <p className="mb-6">
                Clique em "Iniciar Análise com IA" para gerar uma análise avançada da estrutura de headings.
                {headingStructure.headings.length === 0 && " Você não possui headings na descrição atual."}
              </p>
              
              {headingStructure.headings.length > 0 && (
                <Card className="w-full mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-sm font-semibold mb-2">Headings atuais:</h3>
                    <ul className="space-y-2">
                      {headingStructure.headings.map((heading, index) => (
                        <li key={index} className="text-sm">
                          <Badge variant="outline" className="mr-2">H{heading.level}</Badge>
                          {heading.text}
                        </li>
                      ))}
                    </ul>
                    
                    {currentProductTitle && (
                      <Alert className="mt-4 bg-blue-50 border-blue-200">
                        <AlertDescription className="text-blue-700">
                          <strong>Título do produto:</strong> {currentProductTitle} (será usado como H1)
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
              
              <Button onClick={onAnalyze} disabled={isAnalyzing}>
                <Brain className="h-4 w-4 mr-2" />
                Iniciar Análise com IA
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 p-1">
                {/* Score and Summary Section */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Pontuação SEO</h3>
                      {renderSeoScore(analysis.analysis.seoScore)}
                    </div>
                    
                    <Progress 
                      value={analysis.analysis.seoScore} 
                      className="h-2 mb-4" 
                      style={{
                        background: 'linear-gradient(to right, #ef4444, #f59e0b, #84cc16)', 
                      }}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                          Pontos Fortes
                        </h4>
                        <ul className="text-sm space-y-1">
                          {renderListItems(analysis.analysis.strengths, 'strength')}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <ThumbsDown className="h-4 w-4 text-amber-500 mr-2" />
                          Pontos a Melhorar
                        </h4>
                        <ul className="text-sm space-y-1">
                          {renderListItems(analysis.analysis.weaknesses, 'weakness')}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Feedback Detalhado</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {analysis.analysis.detailedFeedback}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Suggestions Table */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Sugestões de Headings Otimizados</h3>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nível</TableHead>
                          <TableHead>Texto Sugerido</TableHead>
                          <TableHead>Original</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysis.suggestions.map((suggestion, index) => (
                          <TableRow key={index}>
                            <TableCell>H{suggestion.level}</TableCell>
                            <TableCell>{suggestion.text}</TableCell>
                            <TableCell>
                              {suggestion.original ? (
                                suggestion.original
                              ) : (
                                <Badge variant="outline" className="bg-green-50 text-green-700">Novo</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4">
                      <Button 
                        onClick={onApplySuggestions} 
                        disabled={!analysis || analysis.suggestions.length === 0}
                        className="w-full"
                      >
                        Aplicar Sugestões de Headings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Auto-Correct Section */}
                {analysis.autoCorrect && analysis.autoCorrect.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Correções Automáticas Propostas</h3>
                      
                      <ul className="space-y-3">
                        {analysis.autoCorrect.map((correction, index) => (
                          <li key={index} className="border rounded-md p-3">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant={
                                correction.action === 'add' ? "outline" : 
                                correction.action === 'modify' ? "secondary" : 
                                correction.action === 'remove' ? "destructive" : "default"
                              }>
                                {correction.action === 'add' ? 'Adicionar' : 
                                 correction.action === 'modify' ? 'Modificar' : 
                                 correction.action === 'remove' ? 'Remover' : 'Reordenar'}
                              </Badge>
                              <Badge variant="outline">H{correction.level}</Badge>
                            </div>
                            
                            {correction.action !== 'remove' && (
                              <p className="text-sm mb-1"><strong>Texto:</strong> {correction.text}</p>
                            )}
                            
                            {correction.original && (
                              <p className="text-sm mb-1"><strong>Original:</strong> {correction.original}</p>
                            )}
                            
                            <p className="text-sm text-muted-foreground mt-2">{correction.explanation}</p>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={onApplyAutoCorrection} 
                          disabled={!analysis || analysis.autoCorrect.length === 0}
                          className="w-full"
                          variant="outline"
                        >
                          Aplicar Correções Automáticas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
