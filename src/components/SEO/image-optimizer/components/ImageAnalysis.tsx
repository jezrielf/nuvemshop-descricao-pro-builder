
import React from 'react';
import { AlertTriangle, CheckCircle, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageData {
  blockId: string;
  imageType: string;
  url: string;
  alt: string;
  blockType: string;
  title: string;
  size?: number;
  dimensions?: { width: number; height: number };
  status: 'loading' | 'ok' | 'warning' | 'error';
  issue?: string;
}

interface ImageAnalysisProps {
  imageData: ImageData;
  onOptimize: () => void;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageData, onOptimize }) => {
  const { url, title, size, dimensions, status, issue, alt } = imageData;
  
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="animate-pulse bg-gray-300 h-5 w-5 rounded-full"></div>;
      case 'ok':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={20} />;
      case 'error':
        return <FileWarning className="text-red-500" size={20} />;
      default:
        return null;
    }
  };
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Desconhecido';
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  const getStatusMessage = () => {
    if (status === 'loading') return 'Analisando...';
    if (status === 'ok') return 'Imagem otimizada';
    return issue || 'Problema detectado';
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded border bg-gray-50">
            {url && (
              <img 
                src={url} 
                alt={alt || title} 
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/60x60/EAEAEA/CCCCCC?text=Erro';
                }}
              />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                {getStatusIcon()}
              </div>
              <h3 className="text-sm font-medium">{title}</h3>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <div className="flex gap-x-4">
                <div>
                  <span className="font-medium">Tamanho:</span> {formatFileSize(size)}
                </div>
                {dimensions && (
                  <div>
                    <span className="font-medium">Dimensões:</span> {dimensions.width}x{dimensions.height}
                  </div>
                )}
              </div>
              
              <div className="mt-1">
                <span className="font-medium">Alt:</span> {alt || <span className="text-red-500 italic">Não definido</span>}
              </div>
              
              <div className="mt-1">
                <span className="font-medium">Status:</span> <span className={`
                  ${status === 'ok' ? 'text-green-600' : ''}
                  ${status === 'warning' ? 'text-amber-600' : ''}
                  ${status === 'error' ? 'text-red-600' : ''}
                `}>{getStatusMessage()}</span>
              </div>
            </div>
            
            {(status === 'warning' || status === 'error') && (
              <Button 
                className="mt-2" 
                size="sm"
                onClick={onOptimize}
              >
                Otimizar Imagem
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
