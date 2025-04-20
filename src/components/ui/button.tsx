
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

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  tertiary: "bg-transparent hover:bg-secondary text-foreground",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
};

const sizeStyles = {
  small: "h-8 px-3 text-xs",
  medium: "h-9 px-4 py-2",
  large: "h-10 px-8",
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 py-2",
  lg: "h-10 px-8",
  icon: "h-9 w-9"
};

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
    // Map variant and size to styles
    const mappedVariant = variant as keyof typeof variantStyles;
    const mappedSize = size as keyof typeof sizeStyles;
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[mappedVariant],
          sizeStyles[mappedSize],
          full && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="nimbus-spinner small mr-2" />
        )}
        {leftIcon && !loading && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
