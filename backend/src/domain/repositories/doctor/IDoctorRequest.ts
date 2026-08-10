import { GetDoctorRequestDTO } from "../../../application/DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../../application/DTO/doctorRequet/PaginationDoctorRequestDTO";
import DoctorRequest from "../../entities/doctor/doctorRequestEntity";
import { IBaseRepository } from "../base/IBaseRepository";


export interface IDoctorRequest extends IBaseRepository<DoctorRequest|null>{
    findByEmail(email:string):Promise<DoctorRequest|null>;
    create(data:Partial<DoctorRequest>):Promise<DoctorRequest>;
    update(id:string,data:Partial<DoctorRequest>):Promise<DoctorRequest|null>
    findAll(dto:GetDoctorRequestDTO):Promise<PaginationDoctorRequestDTO>
}