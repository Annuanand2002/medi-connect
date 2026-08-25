import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
} from "lucide-react";

import logo from "@/assets/logo/mediconnect-logo.jpeg";
import SidebarItem from "../../../components/SidebarItem";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logoutPatientThunk } from "../auth/redux/logout.thunk";
import { logoutPatient } from "../auth/redux/patient.auth.slice";

const PatientSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutPatientThunk());

    if (logoutPatientThunk.fulfilled.match(result)) {
      dispatch(logoutPatient());

      navigate("/patient/login", {
        replace: true,
      });
    }
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="admin-sidebar-brand">
        <img src={logo} alt="MediConnect" className="admin-sidebar-logo" />

        <div>
          <h2>MediConnect</h2>

          <p>Patient Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <SidebarItem
          to="/patient/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/patient/doctor-list"
          icon={ClipboardList}
          label="Doctor List"
        />

        <SidebarItem
          to="/patient/appointments"
          icon={Stethoscope}
          label="Appointments"
        />

        <SidebarItem to="/admin/settings" icon={Settings} label="Settings" />
      </nav>

      {/* Logout */}
      <div className="admin-sidebar-footer">
        <SidebarItem icon={LogOut} label="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
};

export default PatientSidebar;
