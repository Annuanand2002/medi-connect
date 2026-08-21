import { inject, injectable } from "inversify";
import { TYPES } from "../../../../di/types/types";
import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import { JWTService } from "../../../../infrastructure/services/ITokenService.impl";
import { HashService } from "../../../../infrastructure/services/hashService.repo.imple";
import { DoctorLoginResDTO } from "../../../DTO/doctor/loginDoctor.DTO";
import { RefreshTokenReqDTO } from "../../../DTO/refreshTokenReqDTo";
import AppError from "../../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import { IRefreshDoctorUseCase } from "../../../../domain/repositories/doctor/repo.usecase/IDoctorRefresh.usecase";

@injectable()
export class RefreshDoctorUseCase implements IRefreshDoctorUseCase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.JWTService)
    private _jwtService: JWTService,
    @inject(TYPES.HashService)
    private _hashService: HashService,
  ) {}
  async execute(request: RefreshTokenReqDTO): Promise<DoctorLoginResDTO> {
    const payload = await this._jwtService.verifyRefreshToken(
      request.refreshToken,
    );
    const doctor = await this._doctorRepo.findById(payload.id);
    if (!doctor) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!doctor.refreshToken) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const isValid = await this._hashService.comparevalue(
      request.refreshToken,
      doctor.refreshToken,
    );
    if (!isValid) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this._jwtService.generateTokens({
      id: doctor.id!,
      userType: "doctor",
    });
    const hashedRefreshToken = await this._hashService.hashValue(
      tokens.refreshToken,
    );
    await this._doctorRepo.updateRefreshToken(doctor.id!, hashedRefreshToken);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      doctor: {
        id: doctor.id!,
        email: doctor.email,
        fullName: doctor.fullName,
        profileImg: doctor.profileImg.url,
      },
    };
  }
}
