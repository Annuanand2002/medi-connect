import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  onClick?: () => void;
}

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  badge,
  onClick,
}: SidebarItemProps) => {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>

      {badge && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
          {badge}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to!}
      className={({ isActive }) =>
        `flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {content}
    </NavLink>
  );
};

export default SidebarItem;