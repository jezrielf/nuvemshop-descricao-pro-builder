
import * as React from "react";
import { Input as NimbusInput } from "@nimbus-ds/components";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "small" | "medium";
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  full?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "medium",
      label,
      hint,
      error,
      disabled,
      readOnly,
      full = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    // Make sure we're passing a valid size for Nimbus Input
    const validatedSize = (size === "small" || size === "medium") ? size : "medium";
    
    return (
      <NimbusInput
        ref={ref}
        size={validatedSize}
        label={label}
        hint={hint}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
        full={full}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
