
import React from 'react';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { UsageQuotaBanner } from '@/components/usage/UsageQuotaBanner';

const Editor: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <UsageQuotaBanner />
        <EditorLayout />
      </div>
    </div>
  );
};

export default Editor;
