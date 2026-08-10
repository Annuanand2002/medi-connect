import {
  LoginPatientDTO,
  LoginPatientResponseDTO,
} from "../../DTO/patient/loginPatientDTO";

export interface IPatientLoginUseCase {
  execute(dto: LoginPatientDTO): Promise<LoginPatientResponseDTO>;
}
