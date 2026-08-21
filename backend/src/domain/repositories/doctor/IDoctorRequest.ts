import { GetDoctorRequestDTO } from "../../../application/DTO/doctorRequet/GetAllDoctorsRequestDTO";
import { PaginationDoctorRequestDTO } from "../../../application/DTO/doctorRequet/PaginationDoctorRequestDTO";
import DoctorRequest from "../../entities/doctor/doctorRequestEntity";
import { IBaseRepository } from "../base/IBaseRepository";


export interface IDoctorRequest extends IBaseRepository<DoctorRequest>{
    findByEmail(email:string):Promise<DoctorRequest|null>;
    findDoctorRequests(dto:GetDoctorRequestDTO):Promise<PaginationDoctorRequestDTO>
}