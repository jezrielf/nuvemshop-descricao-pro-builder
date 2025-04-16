
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CopyIcon } from 'lucide-react';

interface CodeTestSectionProps {
  testCode: string;
  setTestCode: (code: string) => void;
  handleTestCode: () => void;
  authenticating: boolean;
  copyToClipboard: (text: string) => void;
}

export const CodeTestSection: React.FC<CodeTestSectionProps> = ({
  testCode,
  setTestCode,
  handleTestCode,
  authenticating,
  copyToClipboard
}) => {
  return (
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
  );
};
