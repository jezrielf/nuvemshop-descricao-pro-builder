
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export const SectionEditor: React.FC<EditorProps> = ({ 
  label, 
  value, 
  onChange, 
  multiline 
}) => {
  const InputComponent = multiline ? Textarea : Input;
  
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <InputComponent 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={multiline ? "min-h-[100px]" : ""}
      />
    </div>
  );
};
