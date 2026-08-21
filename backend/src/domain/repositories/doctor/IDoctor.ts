import { GetDoctorReqDTO, PaginationDoctorResDTO } from "../../../application/DTO/doctor/getDoctorDTO";
import Doctor from "../../entities/doctor/doctor.entity";
import { IBaseRepository } from "../base/IBaseRepository";


export interface IDoctorRepo extends IBaseRepository<Doctor>{
    findByEmail(email:string):Promise<Doctor|null>;
    updateRefreshToken(id:string,refreshToken:string|null):Promise<void>
    countByDepartment(departmentId:string):Promise<number>
    findLastdoctor():Promise<Doctor|null>
    findDoctors(dto : GetDoctorReqDTO):Promise<PaginationDoctorResDTO>
}