import type { SelectHTMLAttributes } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  error?: string;
}

const Dropdown = ({ label, options, error, ...props }: DropdownProps) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        <select
          {...props}
          className="custom-input"
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="input-error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;