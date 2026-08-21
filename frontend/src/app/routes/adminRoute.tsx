
import ProtectedRoute from "@/features/admin/auth/components/ProtectedRoute"
import PublicRoute from "@/features/admin/auth/components/PublicRoute"
import LoginPage from "@/features/admin/auth/pages/login"
import DashboardPage from "@/features/admin/pages/Dashboard"
import DoctorPageList from "@/features/admin/pages/doctorList"
import DoctorRequestDetailsPage from "@/features/admin/pages/doctorRequestDetailsPage"
import DoctorRequestsPageList from "@/features/admin/pages/doctorRequestList"
import PatientPageList from "@/features/admin/pages/patientList"
import { Route, Routes } from "react-router-dom"

const AdminRoute = ()=>{
   return(
    <Routes>
     <Route element={<PublicRoute/>}>
     <Route path="/login" element={<LoginPage />} />
     </Route>

     <Route element={<ProtectedRoute/>}>
     <Route path="/dashboard" element={<DashboardPage />} />
     <Route
            path="/doctor-request"
            element={<DoctorRequestsPageList />}
          />
                    <Route
            path="/doctor-request/:id"
            element={<DoctorRequestDetailsPage />}
          />
          <Route path="/doctors"
          element = {<DoctorPageList/>}
          />
          <Route path="/patient" element={<PatientPageList/>}/>
          
     </Route>
    </Routes>
   )
}

export default AdminRoute