import { DoctorBlock } from "../../../entities/doctor/doctorBlock.entity";

export interface IDeleteDoctorBlockUseCase {
    execute(id:string):Promise<DoctorBlock | null>
}