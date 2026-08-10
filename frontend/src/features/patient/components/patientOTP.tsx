import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/button";
import Input from "@/components/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { verifyPatientOTPThunk } from "../redux/verifyOTP.thunk";
import {
  patientOtpSchema,
  type PatientOtpFormData,
} from "../validation/patientOTP.schema";

const PatientOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.patientOtp,
  );

  const { patientId, email } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientOtpFormData>({
    resolver: zodResolver(patientOtpSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onSubmit = async (data: PatientOtpFormData) => {
    const result = await dispatch(
      verifyPatientOTPThunk({
        patientId,
        otp: data.otp,
      }),
    );

    if (verifyPatientOTPThunk.fulfilled.match(result)) {
      navigate("/patient/login", {
        replace: true,
      });
    }
  };

  const handleResend = () => {
    console.log("Resend OTP for:", patientId);

    setTimeLeft(60);
  };

  if (!patientId || !email) {
    navigate("/patient/create-patient", {
      replace: true,
    });

    return null;
  }

  return (
    <section className="patient-otp-content">
      <div
        className="patient-otp-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3 20 6v5c0 5.1-3.4 9.5-8 11-4.6-1.5-8-5.9-8-11V6l8-3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m8.8 12 2.1 2.1 4.4-4.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <header className="patient-otp-header">
        <span className="patient-otp-label">
          EMAIL VERIFICATION
        </span>

        <h1>Verify your email.</h1>

        <p>
          We sent a six-digit verification code to the email address below.
        </p>
      </header>

      <div className="patient-otp-email">
        <span>Verification code sent to</span>
        <strong>{email}</strong>
      </div>

      {error && (
        <div
          className="patient-otp-error"
          role="alert"
        >
          <span>!</span>
          <p>{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="patient-otp-form"
      >
        <Input
          id="patient-otp"
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          {...register("otp")}
          error={errors.otp?.message}
        />

        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>

      <div className="patient-otp-resend">
        {timeLeft > 0 ? (
          <p>
            Didn’t receive a code?
            <span> Resend available in {timeLeft}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
          >
            Resend verification code
          </button>
        )}
      </div>

      <p className="patient-otp-security-note">
        Your account stays protected with secure email verification.
      </p>
    </section>
  );
};

export default PatientOtp;