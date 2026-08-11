import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail } from "lucide-react";

import { useAppDispatch } from "@/hooks/hooks";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInpur";
import Button from "@/components/button";

import {
  loginPatientSchema,
  type LoginPatientFormData,
} from "../schema/loginPatient.svhema";
import { loginPatientSuccess } from "../redux/patient.auth.slice";
import { loginPatient } from "../api/login.patient";

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
    <section className="patient-login-form-panel">
      <div className="patient-login-form-container">
        <div className="patient-login-mobile-brand">
          <div className="patient-login-mobile-mark">MC</div>

          <div>
            <strong>MediConnect</strong>
            <span>Patient Portal</span>
          </div>
        </div>

        <header className="patient-login-header">
          <span className="patient-login-label">PATIENT SIGN IN</span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to manage your appointments and stay connected to your
            healthcare journey.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="patient-login-form">
          <Input
            id="patient-email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            leftIcon={<Mail size={19} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            id="patient-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="patient-login-options">
            <Link to="/patient/request-reset">Forgot password?</Link>
          </div>

          {loginError && (
            <div className="patient-login-error" role="alert">
              <span>!</span>
              <p>{loginError}</p>
            </div>
          )}

          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
                    <div className="doctor-form-options">

            <Link
              to="/patient/create-patient"
              className="doctor-forgot-password"
            >
              New here?
            </Link>

          </div>
        </form>

        <div className="patient-login-security-note">
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3 20 6v5c0 5.1-3.4 9.5-8 11-4.6-1.5-8-5.9-8-11V6l8-3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Secure patient access
        </div>
      </div>
    </section>
  );
};

export default LoginPatientForm;
