import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="input-group">

        <label
          htmlFor={id}
          className="input-label"
        >
          {label}
        </label>

        <div
          className={`input-wrapper ${
            error ? "input-error" : ""
          }`}
        >
          {leftIcon && (
            <span className="input-left-icon">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            className={`custom-input ${className}`}
            {...props}
          />

          {rightIcon && (
            <span className="input-right-icon">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p
            className="input-error-message"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;