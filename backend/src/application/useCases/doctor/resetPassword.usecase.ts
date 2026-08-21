import { inject, injectable } from "inversify";
import { SetDoctorPasswordDTO } from "../../DTO/doctor/setPasswordDTO";
import { IDoctorResetTokenRepo } from "../../../domain/repositories/doctor/IDoctorResetToken.repo";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { TYPES } from "../../../di/types/types";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { IHashService } from "../../../domain/services/IHashService";
import { IResetPasswordUsecase } from "../../../domain/repositories/common/IResetPassword.usecase";

@injectable()
export class ResetDoctorPassowrd implements IResetPasswordUsecase {
  constructor(
    @inject(TYPES.DoctorResetTokenRepo)
    private _resetVerificationRepo: IDoctorResetTokenRepo,
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.HashService)
    private _hashService: IHashService,
  ) {}
  async execute(dto: SetDoctorPasswordDTO): Promise<void> {
    const token = await this._resetVerificationRepo.findByToken(dto.token);
    if (!token) {
      throw new AppError("Invalid link", HTTP_STATUS.BAD_REQUEST);
    }
    if (token.expiresAt < new Date()) {
      await this._resetVerificationRepo.deleteByToken(dto.token);
    }
    const doctor = await this._doctorRepo.findById(token?.doctorId);
    if (!doctor) {
      throw new AppError("Doctor not found", HTTP_STATUS.NOT_FOUND);
    }
    const hashedPassword = await this._hashService.hashValue(dto.password);
    await this._doctorRepo.update(doctor.id!, {
      password: hashedPassword,
    });
    await this._resetVerificationRepo.deleteByToken(dto.token);
  }
}
