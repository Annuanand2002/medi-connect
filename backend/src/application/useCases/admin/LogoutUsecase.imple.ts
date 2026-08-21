import { inject, injectable } from "inversify";
import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { JWTService } from "../../../infrastructure/services/ITokenService.impl";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { LogoutReqDTO } from "../../DTO/logoutReq";
import { TYPES } from "../../../di/types/types";
import { ILogoutUseCase } from "../../../domain/repositories/common/ILogoutUseCase";

@injectable()
export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    @inject(TYPES.AdminRepo)
    private _adminRepo: IAdminRepo,
    @inject(TYPES.JWTService)
    private _tokenService: JWTService,
  ) {}
  async execute(request: LogoutReqDTO): Promise<void> {
    const payload = await this._tokenService.verifyRefreshToken(
      request.refreshToken,
    );
    const admin = await this._adminRepo.findById(payload.id);
    if (!admin) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._adminRepo.updateRefreshToken(admin.id!, null);
  }
}
