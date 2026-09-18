import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useNavigate } from "react-router-dom";

import Button from "@/components/button";
import Dropdown from "@/components/DropDown";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInpur";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createPatientThunk } from "../auth/redux/register.patient.thunk";
import { patientRegistrationSchema } from "../validation/patientRegisterationForm.validation";

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
    (state) => state.registerPatient,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientRegistrationFormData>({
    resolver: zodResolver(patientRegistrationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: PatientRegistrationFormData) => {
    const result = await dispatch(createPatientThunk(data));

    if (createPatientThunk.fulfilled.match(result)) {
      const { patientId, email } = result.payload.data;

      navigate("/patient/verify-otp", {
        state: {
          patientId,
          email,
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="patient-registration-form"
    >
      {error && (
        <div
          className="patient-registration-error"
          role="alert"
        >
          <span>!</span>
          <p>{error}</p>
        </div>
      )}

      <section className="patient-registration-section">
        <div className="patient-registration-section-heading">
          <span>01</span>

          <div>
            <h2>Personal details</h2>
            <p>Tell us a little about yourself.</p>
          </div>
        </div>

        <div className="patient-registration-fields patient-registration-grid-two">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Date of Birth"
            type="date"
            autoComplete="bday"
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
        </div>
      </section>

      <section className="patient-registration-section">
        <div className="patient-registration-section-heading">
          <span>02</span>

          <div>
            <h2>Health profile</h2>
            <p>This helps us personalise your care experience.</p>
          </div>
        </div>

        <div className="patient-registration-fields patient-registration-grid-three">
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
            placeholder="In kg"
            min="0"
            {...register("weight", {
              valueAsNumber: true,
            })}
            error={errors.weight?.message}
          />

          <Input
            label="Height"
            type="number"
            placeholder="In cm"
            min="0"
            {...register("height", {
              valueAsNumber: true,
            })}
            error={errors.height?.message}
          />
        </div>
      </section>

      <section className="patient-registration-section">
        <div className="patient-registration-section-heading">
          <span>03</span>

          <div>
            <h2>Secure your account</h2>
            <p>Create a password to protect your health information.</p>
          </div>
        </div>

        <div className="patient-registration-fields patient-registration-grid-two">
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
        </div>
      </section>

      <div className="patient-registration-submit">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <p>Your health details are securely protected by MediConnect.</p>
      </div>
    </form>
  );
};

export default PatientRegisterationForm;