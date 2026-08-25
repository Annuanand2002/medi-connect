import { Menu } from "lucide-react";

interface PatientHeaderProps {
  title: string;
  subtitle?: string;
}

const PatientHeader = ({ title, subtitle }: PatientHeaderProps) => {
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
          <h1>{title}</h1>

          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      {/* Right Section */}
      <div className="admin-header-right">
        <div className="admin-header-profile">
          <div className="admin-header-avatar">A</div>

          <div className="admin-header-admin">
            <span>PATIENT</span>

            <strong>Patient</strong>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
