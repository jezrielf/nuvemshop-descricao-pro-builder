
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-sm font-medium mb-2">Colar URL de redirecionamento</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            id="url-input"
            type="text"
            placeholder="https://descricaopro.com.br/?code=..."
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={extractCodeFromUrl} disabled={!redirectUrl}>
            Extrair Código
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Cole a URL de redirecionamento que contém o código de autorização (ex: https://descricaopro.com.br/?code=...)
        </p>
      </div>
    </div>
  );
};
