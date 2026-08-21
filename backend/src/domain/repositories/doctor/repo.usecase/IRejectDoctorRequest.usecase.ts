import { RejectDoctorRequestDTO } from "../../../../application/DTO/doctorRequet/rejectDoctorRequest.dto";


export interface IRejectDoctorRequestUseCase{
    execute(dto:RejectDoctorRequestDTO):Promise<void>
}