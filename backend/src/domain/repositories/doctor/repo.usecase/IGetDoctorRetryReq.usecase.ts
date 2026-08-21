import DoctorRequest from "../../../entities/doctor/doctorRequestEntity";


export interface IGetDoctorRetryRequest{
    execute(token:string):Promise<DoctorRequest>
}