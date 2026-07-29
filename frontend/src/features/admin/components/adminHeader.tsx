import { Menu } from "lucide-react";
 interface AdminHeaderProps {
    title :string;
    subtitle ?:string;
 }

const AdminHeader = ({title,subtitle}:AdminHeaderProps) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          type="button"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        <div className="hidden md:block">
          <h3 className="font-semibold text-slate-900">
            Admin
          </h3>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;