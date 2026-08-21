import { Activity } from "lucide-react";
import "@/styles/admin/adminDashboard.css";
import DoctorLayout from "@/layout/DoctorLayout";

const DoctorDashboard = () => {
  return (
    <DoctorLayout title="Dashboard" subtitle="Welcome back, Doctor">
      <div className="dashboard-empty-state">
        <div className="empty-state-orbit">
          <div className="empty-state-orbit-ring" />

          <div className="empty-state-orbit-icon">
            <Activity size={23} />
          </div>

          <span className="orbit-dot orbit-dot-one" />
          <span className="orbit-dot orbit-dot-two" />
          <span className="orbit-dot orbit-dot-three" />
        </div>

        <span className="empty-state-label">YOUR COMMAND CENTER</span>

        <h4>Everything is ready.</h4>

        <p>
          Your latest platform activity will appear here as MediConnect gets
          moving.
        </p>

        <div className="empty-state-status">
          <span />
          System ready
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
