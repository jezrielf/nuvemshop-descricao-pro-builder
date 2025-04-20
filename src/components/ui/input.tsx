
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
    // Map string sizes to Nimbus Input's expected size
    const nimbusSize = size === "small" ? 1 : 2;
    
    // Prepare props for NimbusInput, excluding our custom props
    const nimbusProps = {
      ref,
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
    
    return <NimbusInput size={nimbusSize} {...nimbusProps} />;
  }
);

Input.displayName = "Input";

export { Input };
