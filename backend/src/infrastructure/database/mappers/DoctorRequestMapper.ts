import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { DoctorRequestDcoument } from "../models/doctorRequest.model";

export class DoctorRequestMapper {
  static toDomain(document: DoctorRequestDcoument): DoctorRequest {
    return {
      id: document._id.toString(),

      fullName: document.fullName,
      email: document.email,
      dateOfBirth: document.dateOfBirth,

      profileImg: document.profileImg
        ? {
            url: document.profileImg.url,
            publicId: document.profileImg.publicId,
          }
        : undefined,

      qualification: document.qualification,
      specialization: document.specialization,
      experience: document.experience,

      governmentId: {
        url: document.governmentId.url,
        publicId: document.governmentId.publicId,
      },

      medicalLicense: {
        url: document.medicalLicense.url,
        publicId: document.medicalLicense.publicId,
      },

      degreeCertificates: document.degreeCertificates.map((certificate) => ({
        url: certificate.url,
        publicId: certificate.publicId,
      })),

      status: document.status,
      rejectReason: document.rejectReason,
      rejectCount: document.rejectCount,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(entity: Partial<DoctorRequest>) {
    return {
      fullName: entity.fullName,
      email: entity.email,
      dateOfBirth: entity.dateOfBirth,

      profileImg: entity.profileImg,

      qualification: entity.qualification,
      specialization: entity.specialization,
      experience: entity.experience,

      governmentId: entity.governmentId,

      medicalLicense: entity.medicalLicense,

      degreeCertificates: entity.degreeCertificates,

      status: entity.status,

      statusReason: entity.rejectReason,
      rejectCount: entity.rejectCount,
    };
  }
}
