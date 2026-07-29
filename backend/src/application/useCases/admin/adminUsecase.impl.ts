import { IAdminRepo } from "../../../domain/repositories/admin/IAdmin.repo";
import { IHashService } from "../../../domain/services/IHashService";
import { ITokenService } from "../../../domain/services/ITokenService";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { LoginRequestDTO } from "../../DTO/loginReq";
import { LoginResposneDTO } from "../../DTO/loginRes";
import { ILoginAdminUseCase } from "./ILoginAdminUsecase";


export class AdminUseCase implements ILoginAdminUseCase {
  constructor(
    private adminRepo: IAdminRepo,
    private hashService: IHashService,
    private tokenService: ITokenService,
  ) {}
  async execute(request: LoginRequestDTO): Promise<LoginResposneDTO> {
    const admin = await this.adminRepo.findByEmail(request.email);
    if (!admin) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }
    const isPassword = await this.hashService.comparevalue(
      request.password,
      admin.password,
    );
    if (!isPassword) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this.tokenService.generateTokens({
      id: admin.id!,
      userType: "admin",
    });
    const hashedRefershToken = await this.hashService.hashValue(
      tokens.refreshToken,
    );
    await this.adminRepo.updateRefreshToken(admin.id!, hashedRefershToken);
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
