import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FractionNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FractionNumberInput = forwardRef<HTMLInputElement, FractionNumberInputProps>(
  ({ className, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      if (onChange) {
        e.target.value = value;
        onChange(e);
      }
    };

    return (
      <input
        type="text"
        className={cn(
          "w-16 h-12 text-center text-xl font-bold rounded-md border border-input bg-background ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

FractionNumberInput.displayName = "FractionNumberInput"; 