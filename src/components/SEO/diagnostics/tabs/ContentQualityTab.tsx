
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductDescription } from '@/types/editor';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ContentQualityTabProps {
  contentStructure: {
    blockTypeDiversity: number;
    blockTypeCount: Record<string, number>;
    wordCount: number;
    charCount: number;
    contentDensity: number;
    hasImages: boolean;
    hasVideo: boolean;
    hasLists: boolean;
    sectionCount: number;
    imageCount: number;
    videoCount: number;
  };
  description: ProductDescription;
}

export const ContentQualityTab: React.FC<ContentQualityTabProps> = ({ 
  contentStructure, 
  description 
}) => {
  // Convert block type counts to chart data
  const blockTypeData = Object.entries(contentStructure.blockTypeCount)
    .map(([type, count]) => ({ type, count }));
  
  // Media distribution data for pie chart
  const mediaData = [
    { name: 'Texto', value: contentStructure.blockTypeCount.text || 0 },
    { name: 'Imagens', value: contentStructure.imageCount || 0 },
    { name: 'Vídeos', value: contentStructure.videoCount || 0 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Calculate content quality score
  const calculateQualityScore = () => {
    let score = 60; // Base score
    
    // Content length
    if (contentStructure.wordCount > 200) score += 5;
    if (contentStructure.wordCount > 400) score += 5;
    if (contentStructure.wordCount > 800) score += 5;
    
    // Content diversity
    if (contentStructure.blockTypeDiversity >= 3) score += 5;
    if (contentStructure.blockTypeDiversity >= 5) score += 5;
    
    // Media content
    if (contentStructure.hasImages) score += 5;
    if (contentStructure.imageCount > 2) score += 5;
    if (contentStructure.hasVideo) score += 5;
    
    // Structure elements
    if (contentStructure.hasLists) score += 5;
    if (contentStructure.sectionCount >= 3) score += 5;
    
    return Math.min(score, 100);
  };
  
  const qualityScore = calculateQualityScore();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Composição do Conteúdo</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={blockTypeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Mídia</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mediaData.filter(item => item.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mediaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Análise da Qualidade do Conteúdo</CardTitle>
            <div className="text-2xl font-bold">{qualityScore}/100</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Extensão do Conteúdo</h4>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-sm">Total de palavras:</span>
                  <span className="font-medium">{contentStructure.wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total de caracteres:</span>
                  <span className="font-medium">{contentStructure.charCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Densidade de conteúdo:</span>
                  <span className="font-medium">{Math.round(contentStructure.contentDensity)} car/seção</span>
                </div>
              </div>
              <Badge 
                variant={contentStructure.wordCount >= 300 ? "default" : "outline"}
                className={contentStructure.wordCount >= 300 ? "bg-green-100 text-green-800" : ""}
              >
                {contentStructure.wordCount >= 300 ? "Comprimento adequado" : "Conteúdo curto"}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Diversidade de Conteúdo</h4>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-sm">Tipos de blocos:</span>
                  <span className="font-medium">{contentStructure.blockTypeDiversity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total de seções:</span>
                  <span className="font-medium">{contentStructure.sectionCount}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant={contentStructure.hasImages ? "default" : "outline"}>
                  {contentStructure.hasImages ? "Tem Imagens" : "Sem Imagens"}
                </Badge>
                <Badge variant={contentStructure.hasVideo ? "default" : "outline"}>
                  {contentStructure.hasVideo ? "Tem Vídeos" : "Sem Vídeos"}
                </Badge>
                <Badge variant={contentStructure.hasLists ? "default" : "outline"}>
                  {contentStructure.hasLists ? "Tem Listas" : "Sem Listas"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recomendações</h4>
              <ul className="text-sm space-y-1">
                {contentStructure.wordCount < 300 && (
                  <li className="text-amber-600">• Adicione mais conteúdo textual (mín. 300 palavras)</li>
                )}
                {!contentStructure.hasImages && (
                  <li className="text-amber-600">• Adicione pelo menos 1-2 imagens relevantes</li>
                )}
                {contentStructure.blockTypeDiversity < 3 && (
                  <li className="text-amber-600">• Utilize mais tipos de blocos para diversificar o conteúdo</li>
                )}
                {contentStructure.sectionCount < 3 && (
                  <li className="text-amber-600">• Adicione mais seções para estruturar melhor o conteúdo</li>
                )}
                {!contentStructure.hasLists && (
                  <li className="text-amber-600">• Utilize listas para organizar informações e tornar o texto mais legível</li>
                )}
                {qualityScore >= 80 && (
                  <li className="text-green-600">• Conteúdo bem estruturado e diversificado!</li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
