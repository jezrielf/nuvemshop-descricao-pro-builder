
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Info } from 'lucide-react';

export const ImageOptimizationTips: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            <CardTitle>Importância de Otimizar Imagens</CardTitle>
          </div>
          <CardDescription>
            Imagens otimizadas melhoram a velocidade de carregamento e a experiência do usuário
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-700 mb-4">
            Imagens não otimizadas são uma das principais causas de lentidão em sites. 
            Páginas que carregam rápido têm taxas de conversão maiores e 
            são melhor classificadas nos mecanismos de busca.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Boas Práticas para Imagens</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-2">
            {[
              "Comprima suas imagens antes de fazer upload",
              "Use o formato de imagem adequado (JPG para fotos, PNG para transparências, WebP para web)",
              "Defina dimensões apropriadas - não use imagens maiores que o necessário",
              "Sempre inclua texto alternativo (alt) descritivo para acessibilidade e SEO",
              "Considere imagens responsivas para diferentes tamanhos de tela",
              "Use lazy loading para imagens abaixo da dobra"
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ferramentas Recomendadas</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">TinyPNG</h4>
              <p className="text-sm text-gray-700">Compressão inteligente de imagens PNG e JPG sem perda perceptível de qualidade.</p>
              <a href="https://tinypng.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">tinypng.com</a>
            </div>
            
            <div>
              <h4 className="font-medium">Squoosh</h4>
              <p className="text-sm text-gray-700">Ferramenta de compressão online da Google com controles avançados.</p>
              <a href="https://squoosh.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">squoosh.app</a>
            </div>
            
            <div>
              <h4 className="font-medium">ImageOptim</h4>
              <p className="text-sm text-gray-700">Aplicativo para Mac que reduz o tamanho das imagens.</p>
              <a href="https://imageoptim.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">imageoptim.com</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
