
import React from 'react';
import { UrlInputSection } from './connect/authentication/UrlInputSection';
import { CodeTestSection } from './connect/authentication/CodeTestSection';

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

export const AuthenticationPanel: React.FC<AuthenticationPanelProps> = (props) => {
  return (
    <div className="space-y-4">
      <UrlInputSection 
        redirectUrl={props.redirectUrl}
        setRedirectUrl={props.setRedirectUrl}
        extractCodeFromUrl={props.extractCodeFromUrl}
      />
      
      <CodeTestSection 
        testCode={props.testCode}
        setTestCode={props.setTestCode}
        handleTestCode={props.handleTestCode}
        authenticating={props.authenticating}
        copyToClipboard={props.copyToClipboard}
      />
    </div>
  );
};
