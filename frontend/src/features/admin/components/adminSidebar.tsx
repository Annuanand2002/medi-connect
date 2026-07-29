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
import { useAppDispatch } from "@/app/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logoutAdminThunk } from "../auth/redux/logout.thunk";
import { logout } from "../auth/redux/authSlice";

const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const handleLogout = async () => {
    const result = await dispatch(logoutAdminThunk());
    if (logoutAdminThunk.fulfilled.match(result)) {
      dispatch(logout());
      naviagte("/admin/login", { replace: true });
    }
  };
  return (
    <aside className="flex h-screen w-72 flex-col bg-[#23186A] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <img
          src={logo}
          alt="MediConnect"
          className="h-12 w-12 rounded-xl bg-white object-cover p-1"
        />

        <div>
          <h2 className="text-lg font-bold">MediConnect</h2>
          <p className="text-sm text-slate-300">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
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

        <SidebarItem to="/admin/doctors" icon={Stethoscope} label="Doctors" />

        <SidebarItem to="/admin/earnings" icon={IndianRupee} label="Earnings" />

        <SidebarItem to="/admin/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="border-t border-white/10 p-4">
        <SidebarItem icon={LogOut} label="Logout" onClick={handleLogout} />
      </div>
    </aside>
  );
};

export default AdminSidebar;
