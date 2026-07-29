import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import IDoctorVerificationTokenRepo from "../../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import { IHashService } from "../../../../domain/services/IHashService";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { SetDoctorPasswordDTO } from "../../../DTO/doctor/setPasswordDTO";
import { ISetPasswordUsecase } from "./ISetPasswordUsecase";

export class SetPasswordUsecase implements ISetPasswordUsecase {
  constructor(
    private doctorRepo: IDoctorRepo,
    private verificationTokenRepo: IDoctorVerificationTokenRepo,
    private hashService: IHashService,
  ) {}
  async execute(dto: SetDoctorPasswordDTO): Promise<void> {
    const verificationToken = await this.verificationTokenRepo.findByToken(
      dto.token,
    );
    if (!verificationToken) {
      throw new AppError("Invalid verification link", HTTP_STATUS.BAD_REQUEST);
    }
    if (verificationToken.expiresAt < new Date()) {
      await this.verificationTokenRepo.deleteByToken(dto.token);
      throw new AppError("Link expired", HTTP_STATUS.BAD_REQUEST);
    }
    const doctor = await this.doctorRepo.findById(verificationToken?.doctorId);
    if (!doctor) {
      throw new AppError("doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    const hashedpassword = await this.hashService.hashValue(dto.password);
    await this.doctorRepo.update(doctor.id!, {
      password: hashedpassword,
      status: "ACTIVE",
    });
    await this.verificationTokenRepo.deleteByToken(dto.token);
  }
}
