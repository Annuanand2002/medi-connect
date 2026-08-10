import { SetDoctorPasswordDTO } from "../../DTO/doctor/setPasswordDTO";

export interface ISetPasswordUsecase {
  execute(dto: SetDoctorPasswordDTO): Promise<void>;
}
