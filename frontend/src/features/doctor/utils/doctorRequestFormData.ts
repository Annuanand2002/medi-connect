import type { DoctorRequestFormData } from "../types/doctorRequest.type";

export const buildDoctorRequestFormData = (
  data: DoctorRequestFormData,
): FormData => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("qualification", data.qualification);
  formData.append("specialization", data.specialization);
  formData.append("experience", data.experience.toString());
  if (data.profileImg.length > 0) {
    formData.append("profileImg", data.profileImg[0]);
  }
  formData.append("governmentId", data.governmentId[0]);
  formData.append("medicalLicense", data.medicalLicense[0]);
  Array.from(data.degreeCertificates).forEach((file) => {
    formData.append("degreeCertificates", file);
  });
  return formData;
};
