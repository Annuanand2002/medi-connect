import type { ReactNode } from "react";
import AdminSidebar from "../../features/admin/components/adminSidebar";
import AdminHeader from "../../features/admin/components/adminHeader";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col">
        <AdminHeader title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
