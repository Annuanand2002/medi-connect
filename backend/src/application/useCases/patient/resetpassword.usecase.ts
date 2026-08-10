import { inject, injectable } from "inversify";
import { IResetPasswordUsecase } from "../../repository/common/IResetPassword.usecase";
import { TYPES } from "../../../di/types/types";
import { IPatientResetTokenRepo } from "../../../domain/repositories/patient/IResetToken.repo";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { IHashService } from "../../../domain/services/IHashService";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { SetDoctorPasswordDTO } from "../../DTO/doctor/setPasswordDTO";

@injectable()
export class ResetPatientPassowrd implements IResetPasswordUsecase {
  constructor(
    @inject(TYPES.PatientrResetTokenRepo)
    private _resetVerificationRepo: IPatientResetTokenRepo,
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
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
    const patient = await this._patientRepo.findById(token?.patientId);
    if (!patient) {
      throw new AppError("patient not found", HTTP_STATUS.NOT_FOUND);
    }
    const hashedPassword = await this._hashService.hashValue(dto.password);
    await this._patientRepo.update(patient.id!, {
      password: hashedPassword,
    });
    await this._resetVerificationRepo.deleteByToken(dto.token);
  }
}
