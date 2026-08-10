import { SetDoctorPasswordDTO } from "../../DTO/doctor/setPasswordDTO";


export interface IResetPasswordUsecase{
    execute(dto :SetDoctorPasswordDTO):Promise<void>
}