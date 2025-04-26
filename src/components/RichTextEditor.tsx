
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  // Implementação básica - por enquanto só um textarea que aceita HTML
  return (
    <textarea
      className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
