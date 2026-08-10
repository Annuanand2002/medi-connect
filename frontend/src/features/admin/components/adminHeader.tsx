import { Menu } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader = ({
  title,
  subtitle,
}: AdminHeaderProps) => {
  return (
    <header className="admin-header">

      {/* Left Section */}
      <div className="admin-header-left">

        <button
          type="button"
          className="admin-header-menu"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="admin-header-title">

          <h1>
            {title}
          </h1>

          {subtitle && (
            <p>
              {subtitle}
            </p>
          )}

        </div>

      </div>


      {/* Right Section */}
      <div className="admin-header-right">

        <div className="admin-header-profile">

          <div className="admin-header-avatar">
            A
          </div>

          <div className="admin-header-admin">

            <span>
              ADMIN
            </span>

            <strong>
              Admin
            </strong>

          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminHeader;

