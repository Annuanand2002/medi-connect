import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  IndianRupee,
} from "lucide-react";

import logo from "@/assets/logo/mediconnect-logo.jpeg";
import SidebarItem from "./SidebarItem";
import { useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logoutAdminThunk } from "../auth/redux/logout.thunk";
import { logout } from "../auth/redux/authSlice";

const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(
      logoutAdminThunk(),
    );

    if (
      logoutAdminThunk.fulfilled.match(result)
    ) {
      dispatch(logout());

      navigate("/admin/login", {
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
            Admin Dashboard
          </p>
        </div>

      </div>


      {/* Navigation */}
      <nav className="admin-sidebar-nav">

        <SidebarItem
          to="/admin/dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
        />

        <SidebarItem
          to="/admin/doctor-request"
          icon={ClipboardList}
          label="Doctor Requests"
          badge={8}
        />

        <SidebarItem
          to="/admin/doctors"
          icon={Stethoscope}
          label="Doctors"
        />

        <SidebarItem
          to="/admin/earnings"
          icon={IndianRupee}
          label="Earnings"
        />

        <SidebarItem
          to="/admin/settings"
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

export default AdminSidebar;

