import Doctor from "../../../entities/doctor/doctor.entity";

export interface IToggleDoctorStatus {
    execute(id :string):Promise<Doctor>
}