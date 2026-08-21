import { inject, injectable } from "inversify";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { TYPES } from "../../../di/types/types";
import { LogoutReqDTO } from "../../DTO/logoutReq";
import { ITokenService } from "../../../domain/services/ITokenService";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { ILogoutUseCase } from "../../../domain/repositories/common/ILogoutUseCase";

@injectable()
export class LogoutPatientUseCase implements ILogoutUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.JWTService)
    private _tokenService: ITokenService,
  ) {}
  async execute(request: LogoutReqDTO): Promise<void> {
    const payload = await this._tokenService.verifyRefreshToken(
      request.refreshToken,
    );
    const patient = await this._patientRepo.findById(payload.id);
    if (!patient) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._patientRepo.updateRefreshToken(patient.id!, null);
  }
}
