import Doctor from "../../../domain/entities/doctor/doctor.entity";
import { DoctorDocument } from "../models/doctor.model";

export default class DoctorMapper {
  static toDomain(document: DoctorDocument): Doctor {
    return {
      id: document._id.toString(),
      doctorCode: document.doctorCode ?? undefined,
      fullName: document.fullName,
      email: document.email,
      password: document.password ?? undefined,
      profileImg: document.profileImg,
      qualification: document.qualification,
      specialization: document.specialization,
      experience: document.experience,
      departmentId: document.departmentId.toString(),
      refreshToken: document.refreshToken ?? undefined,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}
