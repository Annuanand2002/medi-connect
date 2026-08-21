import { inject, injectable } from "inversify";
import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { IHashService } from "../../../domain/services/IHashService";
import { ITokenService } from "../../../domain/services/ITokenService";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { LoginRequestDTO } from "../../DTO/loginReq";
import { LoginResposneDTO } from "../../DTO/loginRes";
import { TYPES } from "../../../di/types/types";
import { ILoginAdminUseCase } from "../../../domain/repositories/admin/ILoginAdminUsecase";

@injectable()
export class AdminUseCase implements ILoginAdminUseCase {
  constructor(
    @inject(TYPES.AdminRepo)
    private _adminRepo: IAdminRepo,
    @inject(TYPES.HashService)
    private _hashService: IHashService,
    @inject(TYPES.JWTService)
    private _tokenService: ITokenService,
  ) {}
  async execute(request: LoginRequestDTO): Promise<LoginResposneDTO> {
    const admin = await this._adminRepo.findByEmail(request.email);
    if (!admin) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }
    const isPassword = await this._hashService.comparevalue(
      request.password,
      admin.password,
    );
    if (!isPassword) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this._tokenService.generateTokens({
      id: admin.id!,
      userType: "admin",
    });
    const hashedRefershToken = await this._hashService.hashValue(
      tokens.refreshToken,
    );
    await this._adminRepo.updateRefreshToken(admin.id!, hashedRefershToken);
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
