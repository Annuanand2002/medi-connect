import {
  LayoutDashboard,
  LogOut,
  Settings,
  CalendarClock,
  CalendarX2,
  CalendarOff,
  CalendarCheck2
} from "lucide-react";

import logo from "@/assets/logo/mediconnect-logo.jpeg";
import SidebarItem from "../../../components/SidebarItem";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logoutDoctorThunk } from "../auth/redux/logoutDoctor";
import { logoutDoctor } from "../auth/redux/authDoctor.slice";


const DoctorSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(
      logoutDoctorThunk(),
    );

    if (
      logoutDoctorThunk.fulfilled.match(result)
    ) {
      dispatch(logoutDoctor());

      navigate("/doctor/login", {
        replace: true,
      });
    }
  };

  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-sidebar-brand">

        <img
          src={logo}
          alt="MediConnect"
          className="admin-sidebar-logo"
        />

        <div>
          <h2>
            MediConnect
          </h2>

          <p>
            Doctor Dashboard
          </p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="admin-sidebar-nav">

        <SidebarItem
          to="/doctor/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/doctor/doctorAvail"
          icon={CalendarClock}
          label="Manage Availability"
        />

        <SidebarItem
          to="/doctor/leaves"
          icon={CalendarOff}
          label="Leaves"
        />
        <SidebarItem
          to="/doctor/block-time"
          icon={CalendarX2}
          label="Block-time"
        />

        <SidebarItem
          to="/doctor/appointments"
          icon={ CalendarCheck2}
          label="Appointments"
        />

        <SidebarItem
          to="/doctor/settings"
          icon={Settings}
          label="Settings"
        />

      </nav>


      {/* Logout */}
      <div className="admin-sidebar-footer">

        <SidebarItem
          icon={LogOut}
          label="Logout"
          onClick={handleLogout}
        />

      </div>

    </aside>
  );
};

export default DoctorSidebar;
