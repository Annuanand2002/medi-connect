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
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition
          ${error ? "border-red-500" : "border-gray-300 focus:border-black"}
        `}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
