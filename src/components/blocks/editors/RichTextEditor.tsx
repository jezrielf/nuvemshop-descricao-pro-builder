
import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Digite seu texto aqui...',
  className = ''
}) => {
  // A simple contentEditable component for now
  // In a real implementation, this would use a proper rich text editor like TipTap, CKEditor, etc.
  
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    onChange(newValue);
  };
  
  return (
    <div 
      className={`p-3 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      contentEditable
      dangerouslySetInnerHTML={{ __html: value }}
      onInput={handleChange}
      data-placeholder={placeholder}
    />
  );
};

export default RichTextEditor;
