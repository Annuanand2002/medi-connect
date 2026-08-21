import { SetDoctorPasswordDTO } from "../../../application/DTO/doctor/setPasswordDTO";



export interface IResetPasswordUsecase{
    execute(dto :SetDoctorPasswordDTO):Promise<void>
}