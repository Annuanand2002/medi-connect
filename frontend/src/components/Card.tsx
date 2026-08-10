import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`rounded-xl
            bg-white
            p-8
            shadow-lg
            ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
