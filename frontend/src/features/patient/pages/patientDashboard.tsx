import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { logoutPatientThunk } from "../auth/redux/logout.thunk";
import { logoutPatient } from "../auth/redux/patient.auth.slice";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logoutPatientThunk());
    if (logoutPatientThunk.fulfilled.match(result)) {
      dispatch(logoutPatient());
      navigate("/patient/login", { replace: true });
    }
  };

  return (
   <div>
     <h1>Patient Dashboard</h1>
  <button onClick={handleLogout}>Logout</button>
   </div>
);
};

export default PatientDashboard;
