
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NimbusButton } from '../../../NimbusProvider';

interface UrlInputSectionProps {
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  extractCodeFromUrl: () => void;
  useNimbusUI?: boolean;
}

export const UrlInputSection: React.FC<UrlInputSectionProps> = ({
  redirectUrl,
  setRedirectUrl,
  extractCodeFromUrl,
  useNimbusUI
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">1. Cole a URL de redirecionamento</h3>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="https://www.nuvemshop.com.br/admin/..."
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          className="flex-1"
        />
        
        {useNimbusUI ? (
          <NimbusButton
            variant="secondary"
            size="small"
            onClick={extractCodeFromUrl}
            disabled={!redirectUrl}
            className="sm:w-auto w-full"
          >
            Extrair código da URL
          </NimbusButton>
        ) : (
          <Button
            variant="outline"
            onClick={extractCodeFromUrl}
            disabled={!redirectUrl}
            className="sm:w-auto w-full"
          >
            Extrair código da URL
          </Button>
        )}
      </div>
    </div>
  );
};
