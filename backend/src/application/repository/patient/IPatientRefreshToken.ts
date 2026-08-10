import { LoginPatientResponseDTO } from "../../DTO/patient/loginPatientDTO";
import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";

export interface IPatientRefreshUseCase {
  execute(dto: RefreshTokenReqDTO): Promise<LoginPatientResponseDTO>;
}
