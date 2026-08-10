import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  loginPatientSchema,
  type LoginPatientFormData,
} from "../schema/loginPatient.svhema";
import { loginPatientSuccess } from "../redux/patient.auth.slice";
import { loginPatient } from "../api/login.patient";
import axios from "axios";
import Input from "@/components/Input";
import { Mail } from "lucide-react";
import PasswordInput from "@/components/passwordInpur";
import Button from "@/components/button";

const LoginPatientForm = () => {
  const [loginError, setLoginError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPatientFormData>({
    resolver: zodResolver(loginPatientSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginPatientFormData) => {
    try {
      setLoginError("");

      const response = await loginPatient(data);

      dispatch(
        loginPatientSuccess({
          patient: response.result.patient,
          accessToken: response.result.accessToken,
        }),
      );

      navigate("/patient/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data?.message || "Something went wrong.");
      } else {
        setLoginError("Something went wrong.");
      }
    }
  };

  return (
    <section className="login-form-section">
      <div className="login-form-container">
        {/* Mobile Brand */}
        <div className="mobile-brand">
          <div className="mobile-brand-mark">MC</div>

          <div>
            <strong>MediConnect</strong>
            <span>Patient Portal</span>
          </div>
        </div>

        {/* Header */}
        <header className="login-header">
          <div className="login-label">
            <span />
            PATIENT SIGN IN
          </div>

          <h1>
            Welcome back<span>,</span>
          </h1>

          <p>Sign in to continue to your MediConnect patient dashboard.</p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Email */}
          <Input
            id="admin-email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            leftIcon={<Mail size={19} />}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password */}
          <PasswordInput
            id="admin-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Login Error */}
          {loginError && (
            <div className="login-error" role="alert">
              <div className="error-icon">!</div>

              <p>{loginError}</p>
            </div>
          )}

          {/* Submit */}
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Signing In..." : "SIGN IN"}
          </Button>
        </form>
<Link to={"/patient/request-reset"}>Forget Password</Link>
        {/* Security */}
        <div className="security-note">
          <span className="security-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3L20 6V11C20 16.1 16.6 20.5 12 22C7.4 20.5 4 16.1 4 11V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span>Secure patient access</span>
        </div>
      </div>
    </section>
  );
};

export default LoginPatientForm;
