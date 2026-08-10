import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, ShieldCheck } from "lucide-react";
import { useAppDispatch } from "@/hooks/hooks";
import Input from "@/components/Input";
import Button from "@/components/button";
import {
  setPasswordSchema,
  type SetPasswordFormData,
} from "../validation/setPasswors.schema";

import { resetPasswordThunk } from "../redux/resetPassword.Thunk";

import "@/styles/doctor/resetPassword.css";

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/doctor/login", {
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
      resetPasswordThunk({
        token,
        password: data.password,
      }),
    );

    if (resetPasswordThunk.fulfilled.match(resultAction)) {
      navigate("/doctor/login", {
        replace: true,
      });
    }
  };

  return (
    <main className="reset-password-page">
      {/* Decorative background */}
      <div className="reset-password-glow reset-password-glow-one" />
      <div className="reset-password-glow reset-password-glow-two" />

      <div className="reset-password-grid" />

      {/* Card */}
      <section className="reset-password-card">
        {/* Brand */}
        <div className="reset-password-brand">
          <div className="reset-password-brand-mark">MC</div>

          <div className="reset-password-brand-info">
            <strong>MediConnect</strong>
            <span>Doctor Portal</span>
          </div>
        </div>

        {/* Security Icon */}
        <div className="reset-password-icon">
          <ShieldCheck size={27} strokeWidth={1.7} />
        </div>

        {/* Header */}
        <header className="reset-password-header">
          <span className="reset-password-label">PASSWORD RESET</span>

          <h1>
            Reset your
            <br />
            <span>password.</span>
          </h1>

          <p>
            Create a new password to securely access your MediConnect account.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
          {/* New Password */}
          <Input
            id="reset-password"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            autoComplete="new-password"
            leftIcon={<Lock size={19} />}
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Confirm Password */}
          <Input
            id="reset-confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            leftIcon={<Lock size={19} />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Submit */}
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
          </Button>
        </form>

        {/* Security Message */}
        <div className="reset-password-security">
          <ShieldCheck size={14} strokeWidth={1.8} />

          <span>Your password is securely protected</span>
        </div>

        {/* Footer */}
        <footer className="reset-password-footer">
          MediConnect · Doctor Portal
        </footer>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
