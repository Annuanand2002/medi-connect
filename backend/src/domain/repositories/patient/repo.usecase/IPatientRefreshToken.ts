import { LoginPatientResponseDTO } from "../../../../application/DTO/patient/loginPatientDTO";
import { RefreshTokenReqDTO } from "../../../../application/DTO/refreshTokenReqDTo";

export interface IPatientRefreshUseCase {
  execute(dto: RefreshTokenReqDTO): Promise<LoginPatientResponseDTO>;
}
