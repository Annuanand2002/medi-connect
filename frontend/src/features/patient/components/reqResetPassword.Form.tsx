import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Mail } from "lucide-react";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/features/doctor/validation/requestResetPassword";
import { resetPatientPasswordRequest } from "../api/request-resetPssword.patient";
import Input from "@/components/Input";
import Button from "@/components/button";

const RequestResetPatientPasswordForm = () => {
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

      const response = await resetPatientPasswordRequest(data.email);

      setMessage(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <section className="patient-reset-form-panel">
      <div className="patient-reset-form-container">
        <div className="patient-reset-icon">
          <Mail
            size={24}
            strokeWidth={1.7}
          />
        </div>

        <header className="patient-reset-header">
          <span className="patient-reset-label">
            PASSWORD RESET
          </span>

          <h1>Reset your password.</h1>

          <p>
            Enter the email address linked to your account and we’ll send you
            a secure reset link.
          </p>
        </header>

        {error && (
          <div
            className="patient-reset-alert patient-reset-alert-error"
            role="alert"
          >
            <span>!</span>
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div
            className="patient-reset-alert patient-reset-alert-success"
            role="status"
          >
            <span>✓</span>
            <p>{message}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmitted)}
          className="patient-reset-form"
        >
          <Input
            id="patient-reset-email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            leftIcon={<Mail size={19} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            loading={isSubmitting}
          >
            {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </form>

        <p className="patient-reset-security-note">
          For your security, reset links are sent only to registered email
          addresses.
        </p>

        <footer className="patient-reset-footer">
          © 2026 MediConnect Patient Portal
        </footer>
      </div>
    </section>
  );
};

export default RequestResetPatientPasswordForm;