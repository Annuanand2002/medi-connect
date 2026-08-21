import { inject,injectable } from "inversify";
import { ICreateDoctorLeaveUsecase } from "../../../domain/repositories/doctor/repo.usecase/ICreateDoctorLeave.usecase";
import { TYPES } from "../../../di/types/types";
import { ILeaveDoctor } from "../../../domain/repositories/doctor/IDoctorLeave";
import { DoctorLeave } from "../../../domain/entities/doctor/doctorLeave";
import { createDoctorLeaveDTO } from "../../DTO/doctor/doctorLeave.DTO";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";

@injectable()
export class CreateDoctorLeave implements ICreateDoctorLeaveUsecase{
   constructor(
    @inject(TYPES.DoctorLeaveRepo)
    private _doctorLeave : ILeaveDoctor
   ){}
   async execute(dto: createDoctorLeaveDTO): Promise<DoctorLeave> {
       const existing = await this._doctorLeave.findOverLapLeave(dto.doctorId,dto.startDate,dto.endDate)
       if(existing){
        throw new AppError("Leave exist for the selected date.",HTTP_STATUS.CONFLICT)
       }
       const leave = await this._doctorLeave.create({
        doctorId : dto.doctorId,
        startDate : dto.startDate,
        endDate : dto.endDate,
        reason : dto.reason,
        isDeleted : false
       })
       return leave
   }
}