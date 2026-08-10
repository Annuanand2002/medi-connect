import { inject, injectable } from "inversify";
import { IPatientLoginUseCase } from "../../repository/patient/IPatientLogin";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import {
  LoginPatientDTO,
  LoginPatientResponseDTO,
} from "../../DTO/patient/loginPatientDTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { IHashService } from "../../../domain/services/IHashService";
import { ITokenService } from "../../../domain/services/ITokenService";

@injectable()
export class LoginPatientUseCase implements IPatientLoginUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.HashService)
    private _hashService: IHashService,
    @inject(TYPES.JWTService)
    private _tokenService: ITokenService,
  ) {}
  async execute(dto: LoginPatientDTO): Promise<LoginPatientResponseDTO> {
    const patient = await this._patientRepo.findByEmail(dto.email);
    if (!patient) {
      throw new AppError("Inavild email or password", HTTP_STATUS.UNAUTHORIZED);
    }
    const isPassword = this._hashService.comparevalue(
      dto.password,
      patient.password,
    );
    if (!isPassword) {
      throw new AppError("Invalid email or password", HTTP_STATUS.BAD_REQUEST);
    }
    if (!patient.isVerified) {
      throw new AppError(
        "Email is not verified please register again",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const tokens = await this._tokenService.generateTokens({
      id: patient.id!,
      userType: "patient",
    });
    const hashedToken = await this._hashService.hashValue(tokens.refreshToken);
    await this._patientRepo.updateRefreshToken(patient.id!, hashedToken);
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
