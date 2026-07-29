import Button from "@/shared/components/button";
import Input from "@/shared/components/Input";
import PasswordInput from "@/shared/components/passwordInpur";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAdmin } from "../api/loginApi";

import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/app/hooks/hooks";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginError, setLoginError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError("");
      const response = await loginAdmin(data);
      dispatch(
        loginSuccess({
          admin: response.result.admin,
          accessToken: response.result.accessToken,
        }),
      );
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setLoginError(error.response?.data?.message || "Something went wrong.");
      } else {
        setLoginError("Soemthing went wrong");
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl font-bold text-gray-900">SIGN IN</h1>

        <p className="mt-3 text-gray-500">
          Welcome back! Please enter your details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={20} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
          {loginError && (
            <p
              className="rounded-md
            bg-red-100 px-4 py-2 text-sm
            text-red-600
            "
            >
              {loginError}
            </p>
          )}
          <Button type="submit">SIGN IN</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
