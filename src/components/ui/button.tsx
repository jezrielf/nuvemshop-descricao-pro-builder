
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "outline" | "ghost" | "default" | "destructive";
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg" | "icon";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const buttonVariantMap = {
  outline: "secondary",
  ghost: "tertiary",
  default: "primary",
  destructive: "danger",
} as const;

const buttonSizeMap = {
  sm: "small",
  md: "medium",
  lg: "large",
  icon: "small",
} as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = "primary", 
    size = "medium", 
    full = false, 
    loading = false, 
    disabled = false, 
    children, 
    leftIcon, 
    rightIcon,
    className,
    asChild,
    ...props 
  }, ref) => {
    // Map variant from shadcn to our system
    const mappedVariant = buttonVariantMap[variant as keyof typeof buttonVariantMap] || variant;
    
    // Map size from shadcn to our system
    const mappedSize = buttonSizeMap[size as keyof typeof buttonSizeMap] || size;
    
    const variantStyles = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      tertiary: "bg-transparent hover:bg-secondary/80",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizeStyles = {
      small: "h-8 px-3 text-sm",
      medium: "h-10 px-4",
      large: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          variantStyles[mappedVariant as keyof typeof variantStyles],
          sizeStyles[mappedSize as keyof typeof sizeStyles],
          full && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariantMap, buttonSizeMap };
