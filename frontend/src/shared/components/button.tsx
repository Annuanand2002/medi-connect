import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`
            w-full
            rounded-lg
            bg-blue-600
            px-4
            py-3
            font-semibold
            text-white
            transition
            hover : bg-blue-700
            disabled: opacity-80
            ${className}
            `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
