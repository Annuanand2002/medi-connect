import Doctor from "../../../entities/doctor/doctor.entity";

export interface IGetDoctorUseCase{
    execute(id:string):Promise<Doctor|null>
}