import { DoctorRetryToken } from "../../entities/doctor/doctorRetryToken";


export interface IDoctorRetryTokenRepo {
    create(data:DoctorRetryToken):Promise<void>;
    findByToken(token :string):Promise<DoctorRetryToken|null>
    deleteByToken(token:string):Promise<void>;
    deleteBydoctorRequest(doctorRequestId:string):Promise<void>
}