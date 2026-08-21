import DoctorRequest from "../../domain/entities/doctor/doctorRequestEntity";
import { DoctorRequestDcoument } from "../database/models/doctorRequest.model";



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
            key: document.profileImg.key,
          }
        : undefined,

      qualification: document.qualification,
      department: document.department,
      experience: document.experience,

      governmentId: {
        url: document.governmentId.url,
        key: document.governmentId.key,
      },

      medicalLicense: {
        url: document.medicalLicense.url,
        key: document.medicalLicense.key,
      },

      degreeCertificates: document.degreeCertificates.map((certificate) => ({
        url: certificate.url,
        key: certificate.key,
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

      profileImg: entity.profileImg?{
        url : entity.profileImg.url,
        key : entity.profileImg.key
      }:undefined,

      qualification: entity.qualification,
      department: entity.department,
      experience: entity.experience,

      governmentId: entity.governmentId
        ? {
            url: entity.governmentId.url,
            key: entity.governmentId.key,
          }
        : undefined,

      medicalLicense: entity.medicalLicense
        ? {
            url: entity.medicalLicense.url,
            key: entity.medicalLicense.key,
          }
        : undefined,

      degreeCertificates: entity.degreeCertificates?.map((certificate) => ({
        url: certificate.url,
        key: certificate.key,
      })),

      status: entity.status,

      rejectReason: entity.rejectReason,
      rejectCount: entity.rejectCount,
    };
  }
}
