import { useEffect, type ReactNode } from "react";
import AdminSidebar from "../features/admin/components/adminSidebar";
import AdminHeader from "../features/admin/components/adminHeader";
import "@/styles/admin/adminLayout.css";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({
  children,
  title,
  subtitle,
}: AdminLayoutProps) => {
  useEffect(()=>{
    document.title = "Admin | Mediconnect"
    return ()=>{
      document.title = "Mediconnect"
    }
  },[])
  return (
    <div className="admin-layout">

      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Scrollable Application Area */}
      <div className="admin-main">

        <AdminHeader
          title={title}
          subtitle={subtitle}
        />

        <main className="admin-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;

