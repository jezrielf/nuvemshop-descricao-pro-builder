
import React, { createContext, useContext, useState } from 'react';

interface NimbusContextType {
  useNimbusUI: boolean;
  toggleNimbusUI: () => void;
}

const NimbusContext = createContext<NimbusContextType>({
  useNimbusUI: false,
  toggleNimbusUI: () => {}
});

export const useNimbusUI = () => useContext(NimbusContext);

export const NimbusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useNimbusUI, setUseNimbusUI] = useState(false);

  const toggleNimbusUI = () => {
    setUseNimbusUI(prev => !prev);
    console.log('Nimbus UI:', !useNimbusUI ? 'ativado' : 'desativado');
  };

  return (
    <NimbusContext.Provider value={{ useNimbusUI, toggleNimbusUI }}>
      {children}
    </NimbusContext.Provider>
  );
};

// Badge component adaptado para Nimbus Design System
export const NimbusBadge: React.FC<{
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'default', children, className = '' }) => {
  // Mapeamento de variantes para classes Nimbus
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Button component adaptado para Nimbus Design System
export const NimbusButton: React.FC<{
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}> = ({ 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  children, 
  className = '',
  disabled = false
}) => {
  // Mapeamento de variantes para classes Nimbus
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    text: 'bg-transparent hover:bg-gray-100 text-blue-600'
  };

  // Mapeamento de tamanhos para classes Nimbus
  const sizeClasses = {
    small: 'text-xs px-2.5 py-1.5',
    medium: 'text-sm px-4 py-2',
    large: 'text-base px-6 py-3'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Alert component adaptado para Nimbus Design System
export const NimbusAlert: React.FC<{
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ 
  variant = 'default', 
  title, 
  children, 
  className = '' 
}) => {
  // Mapeamento de variantes para classes Nimbus
  const variantClasses = {
    default: 'bg-gray-50 border-gray-200 text-gray-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const baseClasses = 'p-4 border rounded-md';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="text-sm">{children}</div>
    </div>
  );
};
