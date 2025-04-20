
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
    return (
      <NimbusButton
        ref={ref}
        variant={variant}
        size={size}
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
