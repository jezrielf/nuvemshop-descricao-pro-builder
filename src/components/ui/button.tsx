
import * as React from "react";
import { Button as NimbusButton } from "@nimbus-ds/components";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "small" | "medium" | "large";
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

    return (
      <NimbusButton
        ref={ref}
        variant={mappedVariant}
        size={mappedSize}
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
