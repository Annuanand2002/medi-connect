import { createDoctorBlockDTO } from "../../../../application/DTO/doctor/doctorBlock.DTO";
import { DoctorBlock } from "../../../entities/doctor/doctorBlock.entity";

export interface ICreateDoctorBlockUseCase {
    execute(dto:createDoctorBlockDTO):Promise<DoctorBlock>
}