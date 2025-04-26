
import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Digite aqui...'
}) => {
  // Simple textarea-based editor for now
  // This could be replaced with a more sophisticated rich text editor like TipTap or Quill
  return (
    <div className="rich-text-editor w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[120px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default RichTextEditor;
