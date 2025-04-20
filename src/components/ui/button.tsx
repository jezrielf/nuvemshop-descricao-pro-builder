
import * as React from "react";
import { Button as NimbusButton } from "@nimbus-ds/components";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "outline" | "ghost" | "default" | "destructive";
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg" | "icon";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean; // Add this to prevent TypeScript errors but we won't use it
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
  icon: "small", // Map icon size to small
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
    asChild, // We accept this but don't use it
    ...props 
  }, ref) => {
    // Map variant from shadcn to Nimbus
    const mappedVariant = buttonVariantMap[variant as keyof typeof buttonVariantMap] || variant;
    
    // Map size from shadcn to Nimbus
    const mappedSize = buttonSizeMap[size as keyof typeof buttonSizeMap] || size;
    
    // Ensure size is one of the valid Nimbus sizes
    const nimbusSize = ["small", "medium", "large"].includes(mappedSize as string) ? mappedSize : "medium";
    
    // Ensure variant is one of the valid Nimbus variants
    const nimbusVariant = ["primary", "secondary", "tertiary", "danger"].includes(mappedVariant as string) 
      ? mappedVariant 
      : "primary";

    // Pass props that Nimbus Button accepts
    return (
      <NimbusButton
        ref={ref}
        size={nimbusSize as "small" | "medium" | "large"}
        variant={nimbusVariant as "primary" | "secondary" | "tertiary" | "danger"}
        full={full}
        loading={loading}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={className}
        {...props}
      >
        {children}
      </NimbusButton>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariantMap, buttonSizeMap };
