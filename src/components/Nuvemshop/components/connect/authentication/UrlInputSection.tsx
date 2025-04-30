
import React from 'react';
import { Input } from "@/components/ui/input";
import { NimbusButton } from '../../../NimbusProvider';
import { ExternalLink, Clipboard, ArrowRight } from 'lucide-react';

interface UrlInputSectionProps {
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  extractCodeFromUrl: () => void;
}

export const UrlInputSection: React.FC<UrlInputSectionProps> = ({
  redirectUrl,
  setRedirectUrl,
  extractCodeFromUrl
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl);
  };

  const handleOpenNuvemshop = () => {
    window.open('https://www.nuvemshop.com.br/apps', '_blank');
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">1. URL de redirecionamento</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="URL de redirecionamento"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          className="flex-1"
        />
        
        <NimbusButton
          variant="text"
          size="small"
          onClick={handleCopyToClipboard}
          className="sm:w-auto w-full"
        >
          <Clipboard className="h-4 w-4 mr-1" />
          Copiar
        </NimbusButton>
        
        <NimbusButton
          variant="primary"
          size="small"
          onClick={extractCodeFromUrl}
          className="sm:w-auto w-full"
        >
          <ArrowRight className="h-4 w-4 mr-1" />
          Extrair Código
        </NimbusButton>
        
        <NimbusButton
          variant="secondary"
          size="small"
          onClick={handleOpenNuvemshop}
          className="sm:w-auto w-full"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          Acessar Nuvemshop
        </NimbusButton>
      </div>
    </div>
  );
};
