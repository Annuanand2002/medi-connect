import { useForm } from "react-hook-form";
import type { DoctorRequestFormData } from "../types/doctorRequest.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import FileUpload from "@/components/fileUpload";
import Button from "@/components/button";
import { doctorRequestSchema } from "../validation/doctorRequestSchema";
import { useEffect } from "react";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
      <Input
        label="Qualification"
        type="text"
        placeholder="MBBS, MD,MS..."
        {...register("qualification")}
        error={errors.qualification?.message}
      />
      <Input
        label="Specialization"
        type="text"
        placeholder="Cardiology,Neurology..."
        {...register("specialization")}
        error={errors.specialization?.message}
      />
      <Input
        label="Years of experience"
        type="number"
        placeholder="Enter year of experience"
        {...register("experience", {
          valueAsNumber: true,
        })}
        error={errors.experience?.message}
      />
      <FileUpload
        label="Profile Image"
        accept="image/png,image/jpeg"
        helperText="Accepted: PNG,JPEG *MAX 5 MB"
        fileNames={
          profileImg ? Array.from(profileImg).map((file) => file.name) : []
        }
        {...register("profileImg")}
        error={errors.profileImg?.message}
      />
      <FileUpload
        label="Governmnet ID"
        accept=".pdf"
        helperText="Accepted: PDF *MAX 5 MB"
        fileNames={
          governmentId ? Array.from(governmentId).map((file) => file.name) : []
        }
        {...register("governmentId")}
        error={errors.governmentId?.message}
      />
      <FileUpload
        label="Medical License"
        accept=".pdf"
        helperText="Accepted: PDF *MAX 5 MB"
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
        helperText="Accepted: PDF *MAX 5 MB"
        fileNames={
          degreeCertificates
            ? Array.from(degreeCertificates).map((file) => file.name)
            : []
        }
        {...register("degreeCertificates")}
        error={errors.degreeCertificates?.message}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting.." : "Submit Application"}
      </Button>
    </form>
  );
};

export default DoctorRequestForm;
