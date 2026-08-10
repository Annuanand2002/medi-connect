import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { logoutDoctor } from "../auth/redux/authDoctor.slice";
import { logoutDoctorThunk } from "../auth/redux/logoutDoctor";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutDoctorThunk());
    if (logoutDoctorThunk.fulfilled.match(result)) {
      dispatch(logoutDoctor());
      navigate("/doctor/login", { replace: true });
    }
  };

  return (
    <>
    <>doctor dashboard comingg soon</>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default DoctorDashboard;
