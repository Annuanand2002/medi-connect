import { DoctorLoginResDTO } from "../../../../application/DTO/doctor/loginDoctor.DTO";
import { RefreshTokenReqDTO } from "../../../../application/DTO/refreshTokenReqDTo";


export interface IRefreshDoctorUseCase {
  execute(request: RefreshTokenReqDTO): Promise<DoctorLoginResDTO>;
}