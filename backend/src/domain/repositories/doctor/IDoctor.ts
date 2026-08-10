import Doctor from "../../entities/doctor/doctor.entity";
import { IBaseRepository } from "../base/IBaseRepository";


export interface IDoctorRepo extends IBaseRepository<Doctor|null>{
    create(data:Partial<Doctor>):Promise<Doctor>;
    findByEmail(email:string):Promise<Doctor|null>;
    update(id:string,data:Partial<Doctor>):Promise<Doctor|null>;
    updateRefreshToken(id:string,refreshToken:string|null):Promise<void>
    countByDepartment(departmentId:string):Promise<number>
    findLastdoctor():Promise<Doctor|null>
}