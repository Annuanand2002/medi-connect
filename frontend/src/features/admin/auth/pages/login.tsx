import LoginBanner from "../components/LoginBanner";
import LoginForm from "../components/LoginForm";


const LoginPage = ()=>{
    return (
        <div className="flex min-h-screen">
            <LoginBanner/>
            <LoginForm/>
        </div>
    )
}

export default LoginPage;