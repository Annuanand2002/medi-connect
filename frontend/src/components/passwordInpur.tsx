import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label,
      error,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

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
          <span className="input-left-icon">
            <Lock size={19} />
          </span>

          <input
            ref={ref}
            id={id}
            type={
              showPassword
                ? "text"
                : "password"
            }
            className={`custom-input ${className}`}
            {...props}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword(
                (previous) => !previous
              )
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
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

PasswordInput.displayName =
  "PasswordInput";

export default PasswordInput;