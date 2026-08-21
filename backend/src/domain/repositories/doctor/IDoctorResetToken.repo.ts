import { DoctorResetToken } from "../../entities/doctor/doctorResetToken.entity";
import { IBaseRepository } from "../base/IBaseRepository";


export interface IDoctorResetTokenRepo extends IBaseRepository<DoctorResetToken>{
     findByDoctorId(doctorId:string):Promise<DoctorResetToken|null>;
     findByToken(token:string):Promise<DoctorResetToken|null>
     deleteByToken(token:string):Promise<void>
     deleteByDoctorId(doctorId:string):Promise<void>
}