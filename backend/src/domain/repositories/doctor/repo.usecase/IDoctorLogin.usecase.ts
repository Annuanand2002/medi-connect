import { DoctorLoginResDTO } from "../../../../application/DTO/doctor/loginDoctor.DTO";
import { LoginRequestDTO } from "../../../../application/DTO/loginReq";



export interface IDoctorLoginUseCase {
    execute(dto:LoginRequestDTO):Promise<DoctorLoginResDTO>;
}