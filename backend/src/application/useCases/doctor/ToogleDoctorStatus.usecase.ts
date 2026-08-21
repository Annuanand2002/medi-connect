import { inject, injectable } from "inversify";
import { IToggleDoctorStatus } from "../../../domain/repositories/doctor/repo.usecase/IToggleDoctorStatus";
import { TYPES } from "../../../di/types/types";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import Doctor from "../../../domain/entities/doctor/doctor.entity";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class ToggelDoctorStatus implements IToggleDoctorStatus{
    constructor(
        @inject(TYPES.DoctorRepo)
        private _doctorRepo : IDoctorRepo
    ){}
    async execute(id: string): Promise<Doctor> {
        const doctor = await this._doctorRepo.findById(id);
        if(!doctor){
            throw new AppError("No doctor found",HTTP_STATUS.NOT_FOUND)
        }
        const newStatus = doctor.status==="ACTIVE"?"BLOCKED":"ACTIVE";
        const updatedDoctor = await this._doctorRepo.update(doctor.id!,{
            status : newStatus
        })
        if(!updatedDoctor){
            throw new AppError("failed to update doctor status",HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
        return updatedDoctor
    }
}