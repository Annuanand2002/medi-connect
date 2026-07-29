import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { HashService } from "../../../infrastructure/services/hashService.repo.imple";
import { JWTService } from "../../../infrastructure/services/ITokenService.impl";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";
import { RefreshTokenResultDTO } from "../../DTO/refreshTokenResultDTO";
import { IRefreshAdminUseCase } from "../../repository/admin/IRefreshAdminUseCase";

export class RefreshAdminUseCase implements IRefreshAdminUseCase {
  constructor(
    private adminRepo: IAdminRepo,
    private jwtService: JWTService,
    private hashService: HashService,
  ) {}
  async execute(request: RefreshTokenReqDTO): Promise<RefreshTokenResultDTO> {
    const payload = await this.jwtService.verifyRefreshToken(
      request.refreshToken,
    );
    const admin = await this.adminRepo.findById(payload.id);
    if (!admin) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!admin.refreshToken) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const isValid = await this.hashService.comparevalue(
      request.refreshToken,
      admin.refreshToken,
    );
    if (!isValid) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this.jwtService.generateTokens({
      id: admin.id!,
      userType: "admin",
    });
    const hashedRefreshToken = await this.hashService.hashValue(
      tokens.refreshToken,
    );
    await this.adminRepo.updateRefreshToken(admin.id!, hashedRefreshToken);
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
