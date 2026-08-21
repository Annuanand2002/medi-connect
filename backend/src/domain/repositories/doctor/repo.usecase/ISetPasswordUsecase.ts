import { SetDoctorPasswordDTO } from "../../../../application/DTO/doctor/setPasswordDTO";


export interface ISetPasswordUsecase {
  execute(dto: SetDoctorPasswordDTO): Promise<void>;
}
