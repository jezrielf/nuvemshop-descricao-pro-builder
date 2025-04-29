
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileDown } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { SEOTechnicalDiagnostic } from '@/components/SEO/diagnostics/SEOTechnicalDiagnostic';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';
import { analyzeSEOTechnically } from '@/components/SEO/utils/technicalSEOAnalyzer';

const SEOTechnicalAnalysis: React.FC = () => {
  const { description, savedDescriptions } = useEditorStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate('/description-analysis');
  };

  const exportReport = () => {
    if (!description) return;
    
    // Generate analysis
    const analysis = analyzeSEOTechnically(description);
    
    // Format issues for report
    const formatIssues = (issues: string[]) => {
      return issues.map(issue => `- ${issue}`).join('\n');
    };
    
    // Create report content
    const report = `
# Relatório Técnico SEO - ${description.name}
Data: ${new Date().toLocaleDateString('pt-BR')}

## Resumo Geral
Score SEO global: ${analysis.overallScore}/100

## Estrutura de Títulos
Score: ${analysis.headerStructure.score}/100
* H1: ${analysis.headerStructure.h1Count}
* H2: ${analysis.headerStructure.h2Count}
* H3: ${analysis.headerStructure.h3Count}
* Hierarquia adequada: ${analysis.headerStructure.hasProperHierarchy ? 'Sim' : 'Não'}

${analysis.headerStructure.issues.length > 0 ? `
### Problemas Detectados:
${formatIssues(analysis.headerStructure.issues)}
` : ''}

## Análise de Palavras-chave
Score: ${analysis.keywordAnalysis.score}/100
* Palavra-chave principal: "${analysis.keywordAnalysis.mainKeyword}"
* Densidade: ${analysis.keywordAnalysis.mainKeywordDensity.toFixed(2)}%
* Presente no título: ${analysis.keywordAnalysis.keywordDistribution.title ? 'Sim' : 'Não'}
* Presente no primeiro parágrafo: ${analysis.keywordAnalysis.keywordDistribution.firstParagraph ? 'Sim' : 'Não'}
* Presente nos títulos/subtítulos: ${analysis.keywordAnalysis.keywordDistribution.headings ? 'Sim' : 'Não'}

${analysis.keywordAnalysis.secondaryKeywords.length > 0 ? `
### Palavras-chave Secundárias:
${analysis.keywordAnalysis.secondaryKeywords.map(kw => 
  `- "${kw.keyword}" (${kw.count}x, densidade ${kw.density.toFixed(2)}%)`
).join('\n')}
` : ''}

${analysis.keywordAnalysis.issues.length > 0 ? `
### Problemas Detectados:
${formatIssues(analysis.keywordAnalysis.issues)}
` : ''}

## Qualidade do Conteúdo
Score: ${analysis.contentQuality.score}/100
* Total de palavras: ${analysis.contentQuality.wordCount}
* Número de parágrafos: ${analysis.contentQuality.paragraphCount}
* Média de palavras por sentença: ${analysis.contentQuality.avgSentenceLength.toFixed(1)}
* Score de legibilidade: ${analysis.contentQuality.readabilityScore}/100
* Contém imagens: ${analysis.contentQuality.hasImages ? 'Sim' : 'Não'}
* Alt text nas imagens: ${analysis.contentQuality.imageAltText ? 'Completo' : 'Incompleto'}

${analysis.contentQuality.issues.length > 0 ? `
### Problemas Detectados:
${formatIssues(analysis.contentQuality.issues)}
` : ''}

## Análise Semântica
Score: ${analysis.semanticAnalysis.score}/100
* Correlação título-conteúdo: ${analysis.semanticAnalysis.titleContentMatch.toFixed(0)}%
* Cobertura do tópico: ${analysis.semanticAnalysis.topicCoverage.toFixed(0)}%

${analysis.semanticAnalysis.relatedTermsUsage.length > 0 ? `
### Termos relacionados utilizados:
${analysis.semanticAnalysis.relatedTermsUsage.map(term => `- ${term}`).join('\n')}
` : ''}

${analysis.semanticAnalysis.issues.length > 0 ? `
### Problemas Detectados:
${formatIssues(analysis.semanticAnalysis.issues)}
` : ''}

## Atualidade do Conteúdo
Score: ${analysis.contentFreshness.score}/100
* Última atualização: ${analysis.contentFreshness.lastUpdated.toLocaleDateString('pt-BR')}
* Dias desde a última atualização: ${analysis.contentFreshness.daysSinceUpdate}
${analysis.contentFreshness.updateFrequency > 0 ? `* Frequência média de atualização: ${Math.round(analysis.contentFreshness.updateFrequency)} dias` : ''}

${analysis.contentFreshness.issues.length > 0 ? `
### Problemas Detectados:
${formatIssues(analysis.contentFreshness.issues)}
` : ''}

## Recomendações Prioritárias
${analysis.recommendations.slice(0, 5).map((rec, i) => 
  `${i + 1}. [${rec.type.toUpperCase()}] ${rec.text}${rec.implementation ? `\n   Implementação: ${rec.implementation}` : ''}`
).join('\n\n')}
`;

    // Create and download text file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-report-${description.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Relatório Exportado",
      description: "O relatório técnico de SEO foi baixado com sucesso.",
    });
  };

  if (!description) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner text="Carregando análise..." />
          <p className="mt-4 text-muted-foreground">
            Nenhuma descrição ativa para analisar.
          </p>
          <Button variant="outline" onClick={handleBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Diagnóstico Técnico de SEO</h1>
            <p className="text-muted-foreground">
              Análise técnica detalhada para "{description.name}"
            </p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={exportReport}>
          <FileDown className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>
      
      <Card className="p-6">
        <SEOTechnicalDiagnostic description={description} />
      </Card>
    </div>
  );
};

export default SEOTechnicalAnalysis;
