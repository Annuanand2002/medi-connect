import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { DoctorRequestFormData } from "../types/doctorRequest.type";
import Input from "@/components/Input";
import FileUpload from "@/components/fileUpload";
import Button from "@/components/button";
import { doctorRequestSchema } from "../validation/doctorRequestSchema";

type InitialDoctorValues = Pick<
  DoctorRequestFormData,
  | "fullName"
  | "email"
  | "dateOfBirth"
  | "qualification"
  | "specialization"
  | "experience"
>;

interface DoctorRequestFormProps {
  loading?: boolean;
  initialValues?: InitialDoctorValues;
  onSubmit: (data: DoctorRequestFormData) => void;
}

const DoctorRequestForm = ({
  loading = false,
  initialValues,
  onSubmit,
}: DoctorRequestFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<DoctorRequestFormData>({
    resolver: zodResolver(doctorRequestSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const profileImg = watch("profileImg");
  const governmentId = watch("governmentId");
  const medicalLicense = watch("medicalLicense");
  const degreeCertificates = watch("degreeCertificates");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="doctor-request-form"
    >
      <section className="doctor-request-form-section">
        <div className="doctor-request-section-heading">
          <span>01</span>

          <div>
            <h3>Personal details</h3>
            <p>Information used to identify your application.</p>
          </div>
        </div>

        <div className="doctor-request-fields doctor-request-fields-two-column">
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
        </div>
      </section>

      <section className="doctor-request-form-section">
        <div className="doctor-request-section-heading">
          <span>02</span>

          <div>
            <h3>Professional profile</h3>
            <p>Share your qualifications and area of expertise.</p>
          </div>
        </div>

        <div className="doctor-request-fields doctor-request-fields-two-column">
          <Input
            label="Qualification"
            type="text"
            placeholder="MBBS, MD, MS..."
            {...register("qualification")}
            error={errors.qualification?.message}
          />

          <Input
            label="Specialization"
            type="text"
            placeholder="Cardiology, Neurology..."
            {...register("specialization")}
            error={errors.specialization?.message}
          />

          <Input
            label="Years of Experience"
            type="number"
            placeholder="Enter years of experience"
            min="0"
            {...register("experience", {
              valueAsNumber: true,
            })}
            error={errors.experience?.message}
          />
        </div>
      </section>

      <section className="doctor-request-form-section">
        <div className="doctor-request-section-heading">
          <span>03</span>

          <div>
            <h3>Verification documents</h3>
            <p>Upload clear copies to help us verify your credentials.</p>
          </div>
        </div>

        <div className="doctor-request-upload-grid">
          <FileUpload
            label="Profile Image"
            accept="image/png,image/jpeg"
            helperText="Accepted: PNG, JPEG · Max 5 MB"
            fileNames={
              profileImg
                ? Array.from(profileImg).map((file) => file.name)
                : []
            }
            {...register("profileImg")}
            error={errors.profileImg?.message}
          />

          <FileUpload
            label="Government ID"
            accept=".pdf"
            helperText="Accepted: PDF · Max 5 MB"
            fileNames={
              governmentId
                ? Array.from(governmentId).map((file) => file.name)
                : []
            }
            {...register("governmentId")}
            error={errors.governmentId?.message}
          />

          <FileUpload
            label="Medical License"
            accept=".pdf"
            helperText="Accepted: PDF · Max 5 MB"
            fileNames={
              medicalLicense
                ? Array.from(medicalLicense).map((file) => file.name)
                : []
            }
            {...register("medicalLicense")}
            error={errors.medicalLicense?.message}
          />

          <FileUpload
            label="Degree Certificates"
            accept=".pdf"
            helperText="Accepted: PDF · Max 5 MB"
            fileNames={
              degreeCertificates
                ? Array.from(degreeCertificates).map((file) => file.name)
                : []
            }
            {...register("degreeCertificates")}
            error={errors.degreeCertificates?.message}
          />
        </div>
      </section>

      <div className="doctor-request-submit">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting Application..." : "Submit Application"}
        </Button>

        <p>Your details are securely handled by MediConnect.</p>
      </div>
    </form>
  );
};

export default DoctorRequestForm;