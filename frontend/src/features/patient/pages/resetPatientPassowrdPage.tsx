import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  ShieldCheck } from "lucide-react";

import { useAppDispatch } from "@/hooks/hooks";
import PasswordInput from "@/components/passwordInpur";
import Button from "@/components/button";

import {
  setPasswordSchema,
  type SetPasswordFormData,
} from "@/features/doctor/validation/setPasswors.schema";
import { resetPatientPasswordThunk } from "../redux/resetPassword.thunk";

import "@/styles/patient/resetPatientPassword.css";

const ResetPatientPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/patient/login", {
        replace: true,
      });
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  });

  const onSubmit = async (data: SetPasswordFormData) => {
    if (!token) return;

    const resultAction = await dispatch(
      resetPatientPasswordThunk({
        token,
        password: data.password,
      }),
    );

    if (resetPatientPasswordThunk.fulfilled.match(resultAction)) {
      navigate("/patient/login", {
        replace: true,
      });
    }
  };

  return (
    <main className="patient-reset-password-page">
      <div className="patient-reset-password-grid" />
      <div className="patient-reset-password-glow patient-reset-password-glow-one" />
      <div className="patient-reset-password-glow patient-reset-password-glow-two" />

      <section className="patient-reset-password-card">
        <div className="patient-reset-password-brand">
          <div className="patient-reset-password-brand-mark">
            MC
          </div>

          <div>
            <strong>MediConnect</strong>
            <span>Patient Portal</span>
          </div>
        </div>

        <div className="patient-reset-password-icon">
          <ShieldCheck
            size={28}
            strokeWidth={1.7}
          />
        </div>

        <header className="patient-reset-password-header">
          <span>PASSWORD RESET</span>

          <h1>Choose a new password.</h1>

          <p>
            Set a strong password to regain secure access to your MediConnect
            account.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="patient-reset-password-form"
        >
          <PasswordInput
            id="patient-new-password"
            label="New Password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
          />

          <PasswordInput
            id="patient-confirm-password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            loading={isSubmitting}
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>

        <div className="patient-reset-password-security">
          <ShieldCheck
            size={14}
            strokeWidth={1.8}
          />

          <span>Your account security is our priority.</span>
        </div>
      </section>
    </main>
  );
};

export default ResetPatientPasswordPage;