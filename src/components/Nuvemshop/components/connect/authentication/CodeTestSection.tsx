
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCw } from 'lucide-react';
import { NimbusButton } from '../../../NimbusProvider';

interface CodeTestSectionProps {
  testCode: string;
  setTestCode: (code: string) => void;
  handleTestCode: () => void;
  authenticating: boolean;
  copyToClipboard: (text: string) => void;
  useNimbusUI?: boolean;
}

export const CodeTestSection: React.FC<CodeTestSectionProps> = ({
  testCode,
  setTestCode,
  handleTestCode,
  authenticating,
  copyToClipboard,
  useNimbusUI
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">2. Cole o código de autorização</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Código de autorização"
          value={testCode}
          onChange={(e) => setTestCode(e.target.value)}
          className="flex-1"
        />
        
        {useNimbusUI ? (
          <>
            <NimbusButton
              variant="text"
              size="small"
              onClick={() => copyToClipboard(testCode)}
              disabled={!testCode}
              className="sm:w-auto w-full"
            >
              <Clipboard className="h-4 w-4 mr-1" />
              Copiar
            </NimbusButton>
            
            <NimbusButton
              variant="primary"
              size="small"
              onClick={handleTestCode}
              disabled={!testCode || authenticating}
              className="sm:w-auto w-full"
            >
              {authenticating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {authenticating ? 'Autenticando...' : 'Testar código'}
            </NimbusButton>
          </>
        ) : (
          <>
            <Button
              variant="outline" 
              size="icon"
              onClick={() => copyToClipboard(testCode)}
              disabled={!testCode}
              className="aspect-square h-10"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={handleTestCode}
              disabled={!testCode || authenticating}
              className="sm:w-auto w-full"
            >
              {authenticating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {authenticating ? 'Autenticando...' : 'Testar código'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
