
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface AIFormFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder: string;
  required?: boolean;
  minHeight?: string;
}

const AIFormField: React.FC<AIFormFieldProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  minHeight = "min-h-9"
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-violet-800 mb-1">
        {label}
      </label>
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={minHeight}
      />
    </div>
  );
};

export default AIFormField;
