import { DoctorLoginResDTO } from "../../DTO/doctor/loginDoctor.DTO";
import { LoginRequestDTO } from "../../DTO/loginReq";


export interface IDoctorLoginUseCase {
    execute(dto:LoginRequestDTO):Promise<DoctorLoginResDTO>;
}