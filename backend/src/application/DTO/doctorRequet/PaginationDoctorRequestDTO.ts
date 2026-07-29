import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";


export interface PaginationDoctorRequestDTO{
    requests : DoctorRequest[];
    page : number;
    limit: number;
    total : number;
    totalPages : number;
}