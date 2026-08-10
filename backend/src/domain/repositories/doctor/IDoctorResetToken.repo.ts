import { DoctorResetToken } from "../../entities/doctor/doctorResetToken.entity";


export interface IDoctorResetTokenRepo{
     create(data : DoctorResetToken):Promise<void>
     findByDoctorId(doctorId:string):Promise<DoctorResetToken|null>;
     findByToken(token:string):Promise<DoctorResetToken|null>
     deleteByToken(token:string):Promise<void>
     deleteByDoctorId(doctorId:string):Promise<void>
}