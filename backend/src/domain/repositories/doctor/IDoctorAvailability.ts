import { Week } from "../../../shared/constants/week";
import { DoctorAvailability } from "../../entities/doctor/doctorAvailability";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IDoctorAvailabilityRepo extends IBaseRepository<DoctorAvailability>{
   findByDoctor(doctorId : string):Promise<DoctorAvailability[]>
   findByDoctorAndDay(doctorId:string,dayOfWeek:Week):Promise<DoctorAvailability|null>
   findAvailability(doctorId:string):Promise<DoctorAvailability[]>
}