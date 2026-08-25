import type { ReactNode } from "react";

import "@/styles/admin/adminLayout.css";
import PatientSidebar from "@/features/patient/components/patientSideBar";
import PatientHeader from "@/features/patient/components/patientHeader";

interface PatientLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PatientLayout = ({ children, title, subtitle }: PatientLayoutProps) => {
  return (
    <div className="admin-layout">
      <PatientSidebar />

      <div className="admin-main">
        <PatientHeader title={title} subtitle={subtitle} />

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default PatientLayout;
