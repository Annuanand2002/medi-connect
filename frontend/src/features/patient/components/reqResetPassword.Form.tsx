import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/features/doctor/validation/requestResetPassword";
import { resetPatientPasswordRequest } from "../api/request-resetPssword.patient";
import axios from "axios";
import Input from "@/components/Input";
import { Mail } from "lucide-react";
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
    <div className="flex w-full items-center justify-center bg-[#F8FAFC] lg:w-[55%]">
      <div className="w-full max-w-[470px] bg-white p-12">
        <h4 className="text-sm font-bold tracking-widest text-[#241C84]">
          REQUEST PASSWORD RESET
        </h4>

        <h1 className="serif mt-3 text-[52px] leading-[60px] text-gray-900">
          Welcome back,
          <br />
          Please enter your email to receive a password reset link
        </h1>

        <form onSubmit={handleSubmit(onSubmitted)} className="mt-10 space-y-7">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={20} />}
            error={errors.email?.message}
            {...register("email")}
          />
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {message && (
            <div className="rounded-lg bg-green-50 px-4 py-3">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}

          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Sending..." : "SEND RESET LINK"}
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            © 2026 MediConnect Patient Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPatientPasswordForm;

