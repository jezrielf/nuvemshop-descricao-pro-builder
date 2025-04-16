
import { useEffect } from 'react';
import { useUrlCodeExtractor } from './useUrlCodeExtractor';

export function useNuvemshopCodeExtractor(setTestCode: (code: string) => void) {
  const {
    redirectUrl,
    setRedirectUrl,
    extractCodeFromUrl,
    extractCodeFromReferrer,
    copyToClipboard
  } = useUrlCodeExtractor();

  // Effect to try extracting code from referrer on load
  useEffect(() => {
    // Attempt to extract on initial load
    setTimeout(() => {
      const code = extractCodeFromReferrer();
      if (code) {
        setTestCode(code);
      }
    }, 1000);
  }, [extractCodeFromReferrer, setTestCode]);

  // Helper function to extract code from URL
  const handleExtractCode = () => {
    const code = extractCodeFromUrl(redirectUrl);
    if (code) {
      setTestCode(code);
    }
  };

  return {
    redirectUrl,
    setRedirectUrl,
    handleExtractCode,
    copyToClipboard
  };
}
