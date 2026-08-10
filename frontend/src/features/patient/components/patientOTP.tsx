import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import Input from "@/components/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { verifyPatientOTPThunk } from "../redux/verifyOTP.thunk";
import { patientOtpSchema, type PatientOtpFormData } from "../validation/patientOTP.schema";


const PatientOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.patientOtp
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
      })
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
    <div className="flex min-h-screen items-center justify-center px-4">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-semibold text-gray-900">
          Verify your email
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Enter the 6-digit OTP sent to
        </p>

        <p className="mt-1 font-medium text-gray-900">
          {email}
        </p>


        {error && (
          <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >

          <Input
            label="OTP"
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
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

        </form>


        <div className="mt-6 text-center">

          {timeLeft > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in{" "}
              <span className="font-medium text-gray-900">
                {timeLeft}s
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default PatientOtp;