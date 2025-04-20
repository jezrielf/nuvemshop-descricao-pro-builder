
import * as React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "medium", className, ...props }, ref) => {
    const sizeClasses = {
      small: "h-4 w-4 border-2",
      medium: "h-8 w-8 border-4",
      large: "h-12 w-12 border-6",
    };

    return (
      <div
        ref={ref}
        className={`animate-spin rounded-full border-solid border-primary border-t-transparent ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";
