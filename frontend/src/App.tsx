import { BrowserRouter, Route, Routes, } from "react-router-dom";
import AuthInitializer from "./features/admin/auth/components/AuthInitializer";
import AdminRoute from "./app/routes/adminRoute";
import AuthDoctorInitializer from "./features/doctor/auth/components/authDoctorInitializer";
import DoctorRoute from "./app/routes/doctorRoute";
import AuthPatientInitializer from "./features/patient/auth/components/authPatientInitalizer";
import PatientRoute from "./app/routes/patientRoute";
import LandingPage from "./pages/ladningPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/admin/*" element={
        <AuthInitializer><AdminRoute/></AuthInitializer>
      }/>
      <Route path="/doctor/*" element={
        <AuthDoctorInitializer><DoctorRoute/></AuthDoctorInitializer>
      }/>
      <Route path="/patient/*" element={
        <AuthPatientInitializer><PatientRoute/></AuthPatientInitializer>
      }/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
