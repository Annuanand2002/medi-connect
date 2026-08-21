import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types/types";
import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { JWTService } from "../../../../infrastructure/services/ITokenService.impl";
import { LogoutReqDTO } from "../../../DTO/logoutReq";
import { ILogoutUseCase } from "../../../../domain/repositories/common/ILogoutUseCase";

@injectable()
export class LogoutDoctorUseCase implements ILogoutUseCase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.JWTService)
    private _tokenService: JWTService,
  ) {}
  async execute(request: LogoutReqDTO): Promise<void> {
    const payload = await this._tokenService.verifyRefreshToken(
      request.refreshToken,
    );
    const doctor = await this._doctorRepo.findById(payload.id);
    if (!doctor) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._doctorRepo.updateRefreshToken(doctor.id!, null);
  }
}
