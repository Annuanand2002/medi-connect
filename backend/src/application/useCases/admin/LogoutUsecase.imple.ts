import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { JWTService } from "../../../infrastructure/services/ITokenService.impl";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { LogoutReqDTO } from "../../DTO/logoutReq";
import { ILogoutUseCase } from "../../repository/admin/ILogoutUseCase";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private adminRepo: IAdminRepo,
    private tokenService: JWTService,
  ) {}
  async execute(request: LogoutReqDTO): Promise<void> {
    const payload = await this.tokenService.verifyRefreshToken(
      request.refreshToken,
    );
    const admin = await this.adminRepo.findById(payload.id);
    if (!admin) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    await this.adminRepo.updateRefreshToken(admin.id!, null);
  }
}
