
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
    const inputClass = cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      disabled && "cursor-not-allowed opacity-50",
      size === "small" && "h-8 px-2 text-xs",
      full ? "w-full" : "w-auto",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    return (
      <div className={cn("space-y-1", full && "w-full")}>
        {label && (
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            readOnly={readOnly}
            className={cn(
              inputClass,
              leftIcon && "pl-8",
              rightIcon && "pr-8"
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
