
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CopyIcon, Loader2 } from 'lucide-react';

interface AuthenticationPanelProps {
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  extractCodeFromUrl: () => void;
  testCode: string;
  setTestCode: (code: string) => void;
  handleTestCode: () => void;
  authenticating: boolean;
  copyToClipboard: (text: string) => void;
}

export const AuthenticationPanel: React.FC<AuthenticationPanelProps> = ({
  redirectUrl,
  setRedirectUrl,
  extractCodeFromUrl,
  testCode,
  setTestCode,
  handleTestCode,
  authenticating,
  copyToClipboard
}) => {
  return (
    <div className="space-y-4">
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
      
      <div>
        <h3 className="text-sm font-medium mb-2">Testar com código específico</h3>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0" 
              onClick={() => copyToClipboard(testCode)}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleTestCode} disabled={authenticating || !testCode}>
            {authenticating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Testar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
