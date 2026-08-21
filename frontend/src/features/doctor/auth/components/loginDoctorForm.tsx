import { useAppDispatch } from "@/hooks/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate,useSearchParams } from "react-router-dom";

import {
  loginDoctorSchema,
  type LoginDoctorFormData,
} from "../schema/doctorLoginform.schema";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginDoctor } from "../api/loginDoctor.api";
import { loginDoctorSuccess } from "../redux/authDoctor.slice";

import axios from "axios";

import Input from "@/components/Input";
import { Mail } from "lucide-react";
import PasswordInput from "@/components/passwordInpur";
import Button from "@/components/button";

const LoginDoctorForm = () => {
  const [loginError, setLoginError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const blockedError = searchParams.get("error");
  const displayedError = blockedError || loginError;

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginDoctorFormData>({
    resolver: zodResolver(loginDoctorSchema),
    mode: "all",
  });

  const onSubmit = async (
    data: LoginDoctorFormData,
  ) => {
    try {
      setLoginError("");

      const response = await loginDoctor(data);

      dispatch(
        loginDoctorSuccess({
          doctor: response.result.doctor,
          accessToken: response.result.accessToken,
        }),
      );

      navigate("/doctor/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message ||
            "Something went wrong.",
        );
      } else {
        setLoginError(
          "Something went wrong.",
        );
      }
    }
  };

  return (
    <section className="doctor-login-form-section">

      <div className="doctor-login-form-container">

        {/* Mobile Brand */}
        <div className="doctor-mobile-brand">

          <div className="doctor-mobile-brand-mark">
            MC
          </div>

          <div>
            <strong>MediConnect</strong>
            <span>Doctor Portal</span>
          </div>

        </div>


        {/* Header */}
        <header className="doctor-login-header">

          <div className="doctor-login-label">
            <span />
            DOCTOR SIGN IN
          </div>

          <h1>
            Welcome back<span>,</span>
          </h1>

          <p>
            Sign in to continue to your MediConnect
            doctor dashboard.
          </p>

        </header>


        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="doctor-login-form"
        >

          {/* Email */}
          <Input
            id="doctor-email"
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
            id="doctor-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />


          {/* Forgot Password */}
          <div className="doctor-form-options">

            <Link
              to="/doctor/request-resetpassword"
              className="doctor-forgot-password"
            >
              Forgot password?
            </Link>

          </div>


          {/* Login Error */}
          {displayedError && (
            <div
              className="doctor-login-error"
              role="alert"
            >
              <div className="doctor-error-icon">
                !
              </div>

              <p>
                {displayedError}
              </p>
            </div>
          )}


          {/* Submit */}
          <Button
            type="submit"
            loading={isSubmitting}
          >
            {isSubmitting
              ? "Signing In..."
              : "SIGN IN"}
          </Button>
                    <div className="doctor-form-options">

            <Link
              to="/doctor/apply"
              className="doctor-forgot-password"
            >
              New here?
            </Link>

          </div>
        </form>


        {/* Security */}
        <div className="doctor-security-note">

          <span className="doctor-security-icon">

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

          <span>
            Secure doctor access
          </span>

        </div>

      </div>

    </section>
  );
};

export default LoginDoctorForm;
