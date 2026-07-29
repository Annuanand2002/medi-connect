import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div
          className={`flex items-center rounded-lg border bg-white px-4 py-3 transition ${
            error
              ? "border-red-500"
              : "border-gray-300 focus-within:border-blue-600"
          }`}
        >
          {leftIcon && <span className="mr-3 text-gray-400">{leftIcon}</span>}

          <input
            ref={ref}
            className={`w-full bg-transparent outline-none ${className}`}
            {...props}
          />

          {rightIcon && (
            <span className="ml-3 cursor-pointer text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
