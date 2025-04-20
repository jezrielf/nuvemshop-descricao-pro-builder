
import * as React from "react";
import { cn } from "@/lib/utils";

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
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "h-8 text-sm px-3",
      medium: "h-10 px-4"
    };

    return (
      <div className={cn("space-y-1", full ? "w-full" : "")}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              "flex rounded-md border border-input bg-background text-sm ring-offset-background",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              disabled && "cursor-not-allowed opacity-50",
              sizeClasses[size],
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-300 focus-visible:ring-red-500",
              full && "w-full",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="text-sm text-gray-500">{hint}</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
