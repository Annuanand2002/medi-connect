import { inject, injectable } from "inversify";
import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import IDoctorVerificationTokenRepo from "../../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import { IHashService } from "../../../../domain/services/IHashService";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { SetDoctorPasswordDTO } from "../../../DTO/doctor/setPasswordDTO";
import { ISetPasswordUsecase } from "../../../repository/doctor/ISetPasswordUsecase";
import { TYPES } from "../../../../di/types/types";

@injectable()
export class SetPasswordUsecase implements ISetPasswordUsecase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.DoctorVerificationTokenRepository)
    private _verificationTokenRepo: IDoctorVerificationTokenRepo,
    @inject(TYPES.HashService)
    private _hashService: IHashService,
  ) {}
  async execute(dto: SetDoctorPasswordDTO): Promise<void> {
    const verificationToken = await this._verificationTokenRepo.findByToken(
      dto.token,
    );
    if (!verificationToken) {
      throw new AppError("Invalid verification link", HTTP_STATUS.BAD_REQUEST);
    }
    if (verificationToken.expiresAt < new Date()) {
      await this._verificationTokenRepo.deleteByToken(dto.token);
      throw new AppError("Link expired", HTTP_STATUS.BAD_REQUEST);
    }
    const doctor = await this._doctorRepo.findById(verificationToken?.doctorId);
    if (!doctor) {
      throw new AppError("doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    const hashedpassword = await this._hashService.hashValue(dto.password);
    await this._doctorRepo.update(doctor.id!, {
      password: hashedpassword,
      status: "ACTIVE",
    });
    await this._verificationTokenRepo.deleteByToken(dto.token);
  }
}
