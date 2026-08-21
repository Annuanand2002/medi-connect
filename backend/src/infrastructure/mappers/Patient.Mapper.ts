import { Patient } from "../../domain/entities/patient/patient.entity";
import { PatientDocument } from "../database/models/patient.model";

export class PatientMapper {
  static toDomain(document: PatientDocument): Patient {
    return {
      id: document._id.toString(),
      patientCode: document.patientCode,
      fullName: document.fullName,
      email: document.email,
      dateOfBirth: document.dateOfBirth,
      gender: document.gender,
      password: document.password,
      isVerified: document.isVerified,
      profileImg: document.profileImg
        ? {
            url: document.profileImg.url,
            publicId: document.profileImg.publicId,
          }
        : undefined,
      bloodGroup: document.bloodGroup,
      weight: document.weight,
      height: document.height,
      refreshToken: document.refreshToken ?? undefined,
      isBlocked : document.isBlocked,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(patient: Partial<Patient>) {
    return {
      patientCode: patient.patientCode,
      fullName: patient.fullName,
      email: patient.email,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      password: patient.password,
      isVerified: patient.isVerified,
      profileImg: patient.profileImg
        ? {
            url: patient.profileImg.url,
            publicId: patient.profileImg.publicId,
          }
        : undefined,
      bloodGroup: patient.bloodGroup,
      weight: patient.weight,
      height: patient.height,
      refreshToken: patient.refreshToken ?? null,
      isBlocked : patient.isBlocked
    };
  }
}
