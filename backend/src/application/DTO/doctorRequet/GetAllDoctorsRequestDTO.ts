import { DoctorRequestStatus } from "../../../shared/constants/doctorRequestStatus";

export interface GetDoctorRequestDTO{
    page : number;
    limit : number;
    status?: DoctorRequestStatus;
    search ?: string
}