
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface MetaTagPreviewProps {
  title: string;
  description: string;
  canonical: string;
}

type MetaTagStatus = 'pass' | 'fail' | 'warning';

export const MetaTagPreview: React.FC<MetaTagPreviewProps> = ({
  title,
  description,
  canonical,
}) => {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateMetaTags = () => {
    const checks = [
      {
        id: 'title-present',
        title: 'Meta título presente',
        status: title ? 'pass' : 'fail' as MetaTagStatus,
        description: title ? 'A página tem um meta título definido' : 'A página não tem um meta título definido'
      },
      {
        id: 'title-length',
        title: 'Comprimento do título',
        status: title.length > 10 && title.length <= 60 ? 'pass' : title.length > 60 ? 'fail' : 'warning' as MetaTagStatus,
        description: title.length > 60 
          ? `O título tem ${title.length} caracteres, o ideal é até 60` 
          : title.length <= 10 && title.length > 0
            ? 'O título é muito curto, o ideal é entre 50-60 caracteres'
            : title.length === 0
              ? 'Título não definido'
              : `O título tem ${title.length} caracteres, bom comprimento`
      },
      {
        id: 'description-present',
        title: 'Meta descrição presente',
        status: description ? 'pass' : 'fail' as MetaTagStatus,
        description: description ? 'A página tem uma meta descrição definida' : 'A página não tem uma meta descrição definida'
      },
      {
        id: 'description-length',
        title: 'Comprimento da descrição',
        status: description.length > 50 && description.length <= 160 ? 'pass' : description.length > 160 ? 'warning' : 'fail' as MetaTagStatus,
        description: description.length > 160 
          ? `A descrição tem ${description.length} caracteres, o ideal é até 160` 
          : description.length <= 50 && description.length > 0
            ? 'A descrição é muito curta, o ideal é entre 120-160 caracteres'
            : description.length === 0
              ? 'Descrição não definida'
              : `A descrição tem ${description.length} caracteres, bom comprimento`
      },
      {
        id: 'canonical-present',
        title: 'Link canônico',
        status: canonical ? 'pass' : 'warning' as MetaTagStatus,
        description: canonical 
          ? 'A página tem um link canônico definido' 
          : 'Recomendamos definir um link canônico para evitar conteúdo duplicado'
      },
      {
        id: 'canonical-valid',
        title: 'URL canônica válida',
        status: canonical && isValidUrl(canonical) ? 'pass' : canonical ? 'fail' : 'warning' as MetaTagStatus,
        description: canonical 
          ? isValidUrl(canonical)
            ? 'A URL canônica é válida'
            : 'A URL canônica não parece ser válida'
          : 'URL canônica não definida'
      }
    ];
    
    return checks;
  };

  const getStatusIcon = (status: MetaTagStatus) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Validação</h3>
            {validateMetaTags().map(check => (
              <div key={check.id} className="flex items-start space-x-2 py-2 border-b last:border-0">
                <div className="pt-0.5">
                  {getStatusIcon(check.status)}
                </div>
                <div>
                  <h4 className="font-medium">{check.title}</h4>
                  <p className="text-sm text-gray-600">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Pré-visualização no Google</h3>
            <div className="border rounded-md p-4 space-y-1">
              <div className="text-blue-800 text-xl font-medium line-clamp-1">
                {title || 'Título da sua página'}
              </div>
              <div className="text-green-700 text-sm">
                {canonical || 'www.seusite.com/sua-pagina'}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {description || 'A descrição da sua página aparecerá aqui. Uma boa descrição resume o conteúdo da página e inclui palavras-chave relevantes.'}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Dicas para otimização:</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Inclua palavras-chave relevantes no início do título e da descrição</li>
              <li>Cada página deve ter um título e descrição únicos</li>
              <li>O título deve descrever com precisão o conteúdo da página</li>
              <li>A descrição deve resumir o conteúdo e incentivar o clique</li>
              <li>Use URLs descritivas que incluam palavras-chave</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
