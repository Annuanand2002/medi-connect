import { DoctorBlock } from "../../../entities/doctor/doctorBlock.entity";

export interface IDeleteDoctorBlockUseCase {
    execute(doctorId:string,id:string):Promise<DoctorBlock | null>
}