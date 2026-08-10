import { inject, injectable } from "inversify";
import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { HashService } from "../../../infrastructure/services/hashService.repo.imple";
import { JWTService } from "../../../infrastructure/services/ITokenService.impl";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";
import { RefreshTokenResultDTO } from "../../DTO/refreshTokenResultDTO";
import { IRefreshAdminUseCase } from "../../repository/admin/IRefreshAdminUseCase";
import { TYPES } from "../../../di/types/types";

@injectable()
export class RefreshAdminUseCase implements IRefreshAdminUseCase {
  constructor(
    @inject(TYPES.AdminRepo)
    private _adminRepo: IAdminRepo,
    @inject(TYPES.JWTService)
    private _jwtService: JWTService,
    @inject(TYPES.HashService)
    private _hashService: HashService,
  ) {}
  async execute(request: RefreshTokenReqDTO): Promise<RefreshTokenResultDTO> {
    const payload = await this._jwtService.verifyRefreshToken(
      request.refreshToken,
    );
    const admin = await this._adminRepo.findById(payload.id);
    if (!admin) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!admin.refreshToken) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const isValid = await this._hashService.comparevalue(
      request.refreshToken,
      admin.refreshToken,
    );
    if (!isValid) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this._jwtService.generateTokens({
      id: admin.id!,
      userType: "admin",
    });
    const hashedRefreshToken = await this._hashService.hashValue(
      tokens.refreshToken,
    );
    await this._adminRepo.updateRefreshToken(admin.id!, hashedRefreshToken);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      admin: {
        id: admin.id!,
        email: admin.email,
      },
    };
  }
}
