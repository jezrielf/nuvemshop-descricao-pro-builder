
import React from 'react';
import Editor from '@/components/Editor';
import { UsageQuotaBanner } from '@/components/usage/UsageQuotaBanner';

const EditorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <UsageQuotaBanner />
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
