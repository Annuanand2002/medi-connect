import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";

import { useAppDispatch } from "@/hooks/hooks";
import PasswordInput from "@/components/passwordInpur";
import Button from "@/components/button";
import logo from "@/assets/logo/mediconnect-logo.jpeg";

import { setPasswordThunk } from "../../../features/doctor/redux/setPassword.thunk";
import {
  setPasswordSchema,
  type SetPasswordFormData,
} from "../validation/setPasswors.schema";

import "@/styles/doctor/setupPassword.css";

const SetupPasswordPage = () => {
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
      setPasswordThunk({
        token,
        password: data.password,
      }),
    );

    if (setPasswordThunk.fulfilled.match(resultAction)) {
      navigate("/doctor/login", {
        replace: true,
      });
    }
  };

  return (
    <main className="doctor-setup-password-page">
      <div className="doctor-setup-password-grid" />
      <div className="doctor-setup-password-glow doctor-setup-password-glow-one" />
      <div className="doctor-setup-password-glow doctor-setup-password-glow-two" />

      <section className="doctor-setup-password-card">
        <div className="doctor-setup-password-brand">
          <img
            src={logo}
            alt="MediConnect"
          />

          <div>
            <strong>MediConnect</strong>
            <span>Doctor Portal</span>
          </div>
        </div>

        <div className="doctor-setup-password-icon">
          <ShieldCheck
            size={28}
            strokeWidth={1.7}
          />
        </div>

        <header className="doctor-setup-password-header">
          <span>ACCOUNT ACTIVATION</span>

          <h1>Secure your account.</h1>

          <p>
            Create a password to activate your MediConnect doctor account.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="doctor-setup-password-form"
        >
          <PasswordInput
            id="doctor-setup-password"
            label="Create Password"
            placeholder="Enter a strong password"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
          />

          <PasswordInput
            id="doctor-setup-confirm-password"
            label="Confirm Password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            loading={isSubmitting}
          >
            {isSubmitting ? "Activating Account..." : "Activate Account"}
          </Button>
        </form>

        <div className="doctor-setup-password-security">
          <ShieldCheck
            size={14}
            strokeWidth={1.8}
          />

          <span>Secure access for verified doctors.</span>
        </div>
      </section>
    </main>
  );
};

export default SetupPasswordPage;