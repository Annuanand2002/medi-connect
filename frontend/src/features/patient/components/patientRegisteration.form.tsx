import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Dropdown from "@/components/DropDown";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInpur";
import {
  patientRegistrationSchema,
} from "../validation/patientRegisterationForm.validation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createPatientThunk } from "../auth/redux/register.patient.thunk";


type PatientRegistrationFormData = z.infer<
  typeof patientRegistrationSchema
>;
export type PatientRegistrationRequest = z.infer<
  typeof patientRegistrationSchema
>;

const PatientRegisterationForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.registerPatient
  );

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<PatientRegistrationFormData>({
  resolver: zodResolver(patientRegistrationSchema),
  mode: "onTouched",
});

  const onSubmit = async (
    data: PatientRegistrationFormData
  ) => {
    const result = await dispatch(
      createPatientThunk(data)
    );

    if (createPatientThunk.fulfilled.match(result)) {
      const { patientId, email } = result.payload.result;

      navigate("/patient/verify-otp", {
        state: {
          patientId,
          email,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Date of Birth"
        type="date"
        {...register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
      />

      <Dropdown
        label="Gender"
        {...register("gender")}
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
        ]}
        error={errors.gender?.message}
      />

      <Dropdown
        label="Blood Group"
        {...register("bloodGroup")}
        options={[
          { label: "A+", value: "A+" },
          { label: "A-", value: "A-" },
          { label: "B+", value: "B+" },
          { label: "B-", value: "B-" },
          { label: "AB+", value: "AB+" },
          { label: "AB-", value: "AB-" },
          { label: "O+", value: "O+" },
          { label: "O-", value: "O-" },
        ]}
        error={errors.bloodGroup?.message}
      />

      <Input
        label="Weight"
        type="number"
        placeholder="in kg"
        {...register("weight", {
          valueAsNumber: true,
        })}
        error={errors.weight?.message}
      />

      <Input
        label="Height"
        type="number"
        placeholder="in cm"
        {...register("height", {
          valueAsNumber: true,
        })}
        error={errors.height?.message}
      />

      <PasswordInput
        id="patient-password"
        label="Password"
        placeholder="Enter your password"
        autoComplete="new-password"
        {...register("password")}
        error={errors.password?.message}
      />

      <PasswordInput
        id="patient-confirm-password"
        label="Confirm Password"
        placeholder="Confirm your password"
        autoComplete="new-password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

    </form>
  );
};

export default PatientRegisterationForm;