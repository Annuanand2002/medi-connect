import { DoctorLoginResDTO } from "../../DTO/doctor/loginDoctor.DTO";
import { RefreshTokenReqDTO } from "../../DTO/refreshTokenReqDTo";

export interface IRefreshDoctorUseCase {
  execute(request: RefreshTokenReqDTO): Promise<DoctorLoginResDTO>;
}