
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
    // Define the validated size with correct type
    const validatedSize: "small" | "medium" = size === "small" ? "small" : "medium";
    
    // NimbusInput expects specific props, so we'll create a properly typed object
    const nimbusProps = {
      ref,
      size: validatedSize,
      label,
      hint,
      error,
      disabled,
      readOnly,
      full,
      leftIcon,
      rightIcon,
      ...props
    };
    
    return <NimbusInput {...nimbusProps} />;
  }
);

Input.displayName = "Input";

export { Input };
