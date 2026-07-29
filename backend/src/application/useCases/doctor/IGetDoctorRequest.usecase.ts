import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";

export interface IGetDoctorRequestUseCase {
    execute(id:string):Promise<DoctorRequest|null>
}