
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HeadingStructureTabProps {
  headingStructure: {
    headings: { level: number; text: string }[];
    hasValidH1: boolean;
    hasProperHierarchy: boolean;
    count: number;
    topKeywords: string[];
    structure: string;
  };
}

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = ({ headingStructure }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Estrutura de Cabeçalhos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {headingStructure.headings.length > 0 ? (
              headingStructure.headings.map((heading, index) => (
                <div 
                  key={index} 
                  className={`flex items-start border-l-4 pl-3 py-1 ${
                    heading.level === 1 ? 'border-blue-500 font-bold' : 
                    heading.level === 2 ? 'border-green-500 ml-4' :
                    `border-gray-300 ml-${heading.level * 4}`
                  }`}
                >
                  <Badge variant="outline" className="mr-2">H{heading.level}</Badge>
                  <span>{heading.text}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">
                Nenhum cabeçalho detectado na descrição.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Avaliação da Estrutura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant={headingStructure.hasValidH1 ? "default" : "destructive"}>
              <div className="flex items-center gap-2">
                {headingStructure.hasValidH1 ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>Tag H1</AlertTitle>
              </div>
              <AlertDescription>
                {headingStructure.hasValidH1 
                  ? "A descrição possui uma tag H1, que é essencial para o SEO." 
                  : "A descrição não possui uma tag H1, que é fundamental para o SEO."}
              </AlertDescription>
            </Alert>
            
            <Alert variant={headingStructure.hasProperHierarchy ? "default" : "warning"}>
              <div className="flex items-center gap-2">
                {headingStructure.hasProperHierarchy 
                  ? <CheckCircle2 className="h-4 w-4" /> 
                  : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>Hierarquia</AlertTitle>
              </div>
              <AlertDescription>
                {headingStructure.hasProperHierarchy 
                  ? "A hierarquia de cabeçalhos é consistente e bem estruturada." 
                  : "A hierarquia de cabeçalhos apresenta saltos (ex: H1 para H3), o que não é recomendado."}
              </AlertDescription>
            </Alert>
            
            <Alert variant={headingStructure.count >= 2 ? "default" : "warning"}>
              <div className="flex items-center gap-2">
                {headingStructure.count >= 2 
                  ? <CheckCircle2 className="h-4 w-4" /> 
                  : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle>Quantidade</AlertTitle>
              </div>
              <AlertDescription>
                {headingStructure.count >= 2 
                  ? `Total de ${headingStructure.count} cabeçalhos, quantidade satisfatória.` 
                  : `Apenas ${headingStructure.count} cabeçalhos detectados. É recomendado ter ao menos 2-3 cabeçalhos.`}
              </AlertDescription>
            </Alert>

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Palavras-chave em cabeçalhos:</h4>
              <div className="flex flex-wrap gap-1">
                {headingStructure.topKeywords.length > 0 ? (
                  headingStructure.topKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma palavra-chave significativa encontrada.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
