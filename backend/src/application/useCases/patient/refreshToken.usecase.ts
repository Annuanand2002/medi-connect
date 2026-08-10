import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";
import { ITokenService } from "../../../domain/services/ITokenService";
import { IHashService } from "../../../domain/services/IHashService";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IPatientRefreshUseCase } from "../../repository/patient/IPatientRefreshToken";
import { LoginPatientResponseDTO } from "../../DTO/patient/loginPatientDTO";

@injectable()
export class RefreshPatientToken implements IPatientRefreshUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.JWTService)
    private _tokenService: ITokenService,
    @inject(TYPES.HashService)
    private _hashService: IHashService,
  ) {}
  async execute(dto: RefreshTokenReqDTO): Promise<LoginPatientResponseDTO> {
    const paylaod = await this._tokenService.verifyRefreshToken(
      dto.refreshToken,
    );
    const patient = await this._patientRepo.findById(paylaod.id);
    if (!patient) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!patient.refreshToken) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }
    const isValid = await this._hashService.comparevalue(
      dto.refreshToken,
      patient.refreshToken,
    );
    if (!isValid) {
      throw new AppError("Invaild token", HTTP_STATUS.UNAUTHORIZED);
    }
    const tokens = await this._tokenService.generateTokens({
      id: patient.id!,
      userType: "patient",
    });
    const hashedRefreshToken = await this._hashService.hashValue(
      tokens.refreshToken,
    );
    await this._patientRepo.updateRefreshToken(patient.id!, hashedRefreshToken);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      patient: {
        id: patient.id!,
        fullName: patient.fullName,
        email: patient.email,
      },
    };
  }
}
