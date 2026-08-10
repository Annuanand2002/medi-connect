import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  onClick?: () => void;
  onNavigate?: () => void;
}

const SidebarItem = ({
  to,
  icon: Icon,
  label,
  badge,
  onClick,
  onNavigate,
}: SidebarItemProps) => {
  const content = (
    <>
      <span className="sidebar-item-content">

        <span className="sidebar-item-icon">
          <Icon
            size={19}
            strokeWidth={1.8}
          />
        </span>

        <span className="sidebar-item-label">
          {label}
        </span>

      </span>

      {badge !== undefined && (
        <span className="sidebar-badge">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="sidebar-item sidebar-button"
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to!}
      onClick={onNavigate}
      className={({ isActive }) =>
        `sidebar-item ${
          isActive
            ? "sidebar-item-active"
            : ""
        }`
      }
    >
      {content}
    </NavLink>
  );
};

export default SidebarItem;