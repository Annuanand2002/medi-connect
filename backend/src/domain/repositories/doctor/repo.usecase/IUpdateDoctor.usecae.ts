import { createDoctorBlockDTO } from "../../../../application/DTO/doctor/doctorBlock.DTO";
import { DoctorBlock } from "../../../entities/doctor/doctorBlock.entity";

export interface IUpdateDoctorBlockUsecase {
  execute(id: string, dto: createDoctorBlockDTO): Promise<DoctorBlock | null>;
}
