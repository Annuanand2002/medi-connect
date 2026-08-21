import Doctor from "../../domain/entities/doctor/doctor.entity";
import { DoctorDocument } from "../database/models/doctor.model";
import { DoctorSchema } from "../database/models/doctor.model";

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
      department: document.department,
      experience: document.experience,
      refreshToken: document.refreshToken ?? undefined,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(doctor: Partial<Doctor>): Partial<DoctorSchema> {
    return {
      doctorCode: doctor.doctorCode,
      fullName: doctor.fullName,
      email: doctor.email,
      password: doctor.password,
      profileImg: doctor.profileImg,
      qualification: doctor.qualification,
      department: doctor.department,
      experience: doctor.experience,
      refreshToken: doctor.refreshToken,
      status: doctor.status,
    };
  }
}
