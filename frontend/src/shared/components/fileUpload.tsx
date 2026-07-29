import { UploadCloud } from "lucide-react";
import { forwardRef, useId, type InputHTMLAttributes } from "react";

interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  helperText?: string;
  fileNames?: string[];
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helperText,
      fileNames = [],
      className = "",
      ...props
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <label
          htmlFor={id}
          className={`
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            p-6
            transition
            ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-blue-600 hover:bg-blue-50"
            }
          `}
        >
          <UploadCloud
            className={`mb-3 h-10 w-10 ${
              error ? "text-red-500" : "text-blue-600"
            }`}
          />

          <p className="text-sm font-medium text-gray-700">
            Click to upload
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>

          {fileNames.length > 0 && (
            <div className="mt-4 w-full rounded-lg bg-white p-3">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Selected Files
              </p>

              <ul className="space-y-1">
                {fileNames.map((name, index) => (
                  <li
                    key={index}
                    className="truncate text-sm text-gray-700"
                  >
                    📄 {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </label>

        <input
          id={id}
          ref={ref}
          type="file"
          className={`hidden ${className}`}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;