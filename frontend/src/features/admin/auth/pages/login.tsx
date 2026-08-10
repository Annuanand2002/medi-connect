import "@/styles/admin/adminLogin.css";
import LoginBanner from "../components/LoginBanner";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <main className="admin-login-page">
      <div className="login-shell">
        <LoginBanner />
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
