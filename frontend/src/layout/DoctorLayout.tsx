import type { ReactNode } from "react";

import "@/styles/admin/adminLayout.css";
import DoctorSidebar from "@/features/doctor/components/doctorSidebat";
import DoctorHeader from "@/features/doctor/components/doctorHeader";

interface DoctorLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DoctorLayout = ({ children, title, subtitle }: DoctorLayoutProps) => {
  return (
    <div className="admin-layout">
      {/* Fixed Sidebar */}
      <DoctorSidebar />

      {/* Scrollable Application Area */}
      <div className="admin-main">
        <DoctorHeader title={title} subtitle={subtitle} />

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default DoctorLayout;
