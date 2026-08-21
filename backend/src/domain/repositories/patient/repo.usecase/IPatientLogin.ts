import { LoginPatientDTO, LoginPatientResponseDTO } from "../../../../application/DTO/patient/loginPatientDTO";

export interface IPatientLoginUseCase {
  execute(dto: LoginPatientDTO): Promise<LoginPatientResponseDTO>;
}
