import { useAppSelector } from "@/app/hooks/hooks"
import { Navigate, Outlet } from "react-router-dom";



const PublicRoute = ()=>{
    const {isAuthenticated,isLoading} = useAppSelector((state)=>state.auth);
    if(isLoading){
        return <div>Loading...</div>
    }
    return isAuthenticated?(<Navigate to='/admin/dashboard' replace/>): (<Outlet/>)
}

export default PublicRoute;