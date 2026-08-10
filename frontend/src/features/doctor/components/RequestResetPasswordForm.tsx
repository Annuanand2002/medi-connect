import Button from "@/components/button";
import Input from "@/components/Input";

import { Mail } from "lucide-react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../validation/requestResetPassword";

import { resetDoctorPasswordRequest } from "../api/requestResetPassword.api";

import axios from "axios";

import { Link } from "react-router-dom";

const RequestResetPasswordForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const onSubmitted = async (data: ForgotPasswordFormData) => {
    try {
      setError("");
      setMessage("");

      const response = await resetDoctorPasswordRequest(data.email);

      setMessage(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <section className="doctor-login-form-section">
      <div className="doctor-login-form-container">
        {/* Mobile Brand */}
        <div className="doctor-mobile-brand">
          <div className="doctor-mobile-brand-mark">MC</div>

          <div>
            <strong>MediConnect</strong>

            <span>Doctor Portal</span>
          </div>
        </div>

        {/* Header */}
        <header className="doctor-login-header">
          <div className="doctor-login-label">
            <span />
            PASSWORD RESET
          </div>

          <h1>
            Forgot your
            <br />
            password<span>?</span>
          </h1>

          <p>
            Enter your registered email address and we'll send you a secure link
            to reset your password.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="doctor-login-form"
        >
          <Input
            id="doctor-reset-email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            leftIcon={<Mail size={19} />}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Error */}
          {error && (
            <div className="doctor-login-error" role="alert">
              <div className="doctor-error-icon">!</div>

              <p>{error}</p>
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="doctor-login-success" role="status">
              <div className="doctor-success-icon">✓</div>

              <p>{message}</p>
            </div>
          )}

          {/* Submit */}
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Sending..." : "SEND RESET LINK"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="doctor-back-to-login">
          <Link to="/doctor/login">← Back to Doctor Login</Link>
        </div>

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

          <span>Secure password recovery</span>
        </div>
      </div>
    </section>
  );
};

export default RequestResetPasswordForm;
