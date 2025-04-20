
import * as React from "react";
import { Button as NimbusButton } from "@nimbus-ds/components";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "outline" | "ghost";
  size?: "small" | "medium" | "large" | "sm" | "md" | "lg";
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariantMap = {
  outline: "secondary",
  ghost: "tertiary",
  default: "primary",
} as const;

const buttonSizeMap = {
  sm: "small",
  md: "medium",
  lg: "large",
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
    ...props 
  }, ref) => {
    // Map variant from shadcn to Nimbus
    const mappedVariant = buttonVariantMap[variant as keyof typeof buttonVariantMap] || variant;
    
    // Map size from shadcn to Nimbus
    const mappedSize = buttonSizeMap[size as keyof typeof buttonSizeMap] || size;
    
    // Ensure size is one of the valid Nimbus sizes
    const nimbusSize = ["small", "medium", "large"].includes(mappedSize) ? mappedSize : "medium";
    
    // Ensure variant is one of the valid Nimbus variants
    const nimbusVariant = ["primary", "secondary", "tertiary", "danger"].includes(mappedVariant) ? mappedVariant : "primary";

    return (
      <NimbusButton
        ref={ref}
        variant={nimbusVariant}
        size={nimbusSize}
        full={full}
        loading={loading}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      >
        {children}
      </NimbusButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
