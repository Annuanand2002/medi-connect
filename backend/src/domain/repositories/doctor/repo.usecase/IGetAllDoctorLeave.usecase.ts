import {
  GetLeaveReqDTO,
  PaginationDoctorLeaveResDTO,
} from "../../../../application/DTO/doctor/doctorLeave.DTO";

export interface IGetDoctorLeaveUseCase {
  execute(dto: GetLeaveReqDTO): Promise<PaginationDoctorLeaveResDTO>;
}
