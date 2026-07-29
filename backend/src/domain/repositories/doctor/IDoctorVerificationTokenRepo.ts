import DoctorVerificationToken from "../../entities/doctor/doctorVerificationToken.entity";

export default interface IDoctorVerificationTokenRepo {
  create(
    data: Partial<DoctorVerificationToken>,
  ): Promise<DoctorVerificationToken>;
  findByToken(token: string): Promise<DoctorVerificationToken | null>;
  deleteByToken(token: string): Promise<void>;
  deleteByDoctorId(doctorId: string): Promise<void>;
}
