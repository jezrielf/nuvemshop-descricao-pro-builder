
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { HeadingStructure } from '../../types/headingTypes';

interface HeadingDiagnosticsProps {
  headingStructure: HeadingStructure;
  hasOnlyOneH1: boolean;
  h1ContainsKeywords: boolean;
  currentProductTitle?: string;
}

export const HeadingDiagnostics: React.FC<HeadingDiagnosticsProps> = ({
  headingStructure,
  hasOnlyOneH1,
  h1ContainsKeywords,
  currentProductTitle
}) => {
  return (
    <div className="space-y-4">
      <Alert variant={headingStructure.hasValidH1 ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {headingStructure.hasValidH1 ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>Tag H1</AlertTitle>
        </div>
        <AlertDescription className="text-xs">
          {headingStructure.hasValidH1 
            ? "A descrição possui um H1, essencial para definir o tópico principal da página." 
            : currentProductTitle
              ? `A descrição não possui uma tag H1. Recomendamos usar o título do produto "${currentProductTitle}" como H1.`
              : "A descrição não possui uma tag H1, fundamental para o SEO e para definir o assunto principal."}
        </AlertDescription>
      </Alert>
      
      <Alert variant={hasOnlyOneH1 ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {hasOnlyOneH1 
            ? <CheckCircle2 className="h-4 w-4" /> 
            : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>Unicidade do H1</AlertTitle>
        </div>
        <AlertDescription className="text-xs">
          {hasOnlyOneH1 
            ? "Apenas um H1 encontrado, conforme recomendado para SEO." 
            : `${headingStructure.headings.filter(h => h.level === 1).length} H1s encontrados. O ideal é ter apenas um H1 por página.`}
        </AlertDescription>
      </Alert>
      
      <Alert variant={headingStructure.hasProperHierarchy ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {headingStructure.hasProperHierarchy 
            ? <CheckCircle2 className="h-4 w-4" /> 
            : <AlertTriangle className="h-4 w-4" />}
          <AlertTitle>Hierarquia Semântica</AlertTitle>
        </div>
        <AlertDescription className="text-xs">
          {headingStructure.hasProperHierarchy 
            ? "A hierarquia de cabeçalhos é consistente e semanticamente correta." 
            : "Detectados saltos na hierarquia de cabeçalhos (ex: H1 para H3), prejudicando a semântica estrutural."}
        </AlertDescription>
      </Alert>
      
      <Alert variant={h1ContainsKeywords ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {h1ContainsKeywords 
            ? <CheckCircle2 className="h-4 w-4" /> 
            : <AlertTriangle className="h-4 w-4" />}
          <AlertTitle>H1 com Palavras-chave</AlertTitle>
        </div>
        <AlertDescription className="text-xs">
          {h1ContainsKeywords 
            ? "O H1 contém palavras-chave relevantes, o que é ótimo para SEO." 
            : "O H1 não contém palavras-chave principais, o que pode reduzir sua eficácia para SEO."}
        </AlertDescription>
      </Alert>

      <Separator className="my-2" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Palavras-chave em cabeçalhos:</h4>
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

      <div className="mt-4 bg-slate-50 p-3 rounded-md">
        <h4 className="text-sm font-medium mb-1">Boas práticas de Headings para SEO</h4>
        <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
          <li>Use apenas um H1 por página, contendo a palavra-chave principal</li>
          <li>Mantenha uma hierarquia clara e sequencial (H1 → H2 → H3)</li>
          <li>Use cabeçalhos para estruturar conteúdo, não apenas para estilo</li>
          <li>Inclua palavras-chave secundárias nos cabeçalhos H2 e H3</li>
          <li>Mantenha os cabeçalhos concisos e descritivos</li>
        </ul>
      </div>
    </div>
  );
};
