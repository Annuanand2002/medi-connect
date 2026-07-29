import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IGetDoctorRequestUseCase } from "../../repository/doctor/IGetDoctorRequest.usecase";

export class GetDoctorRequestUseCase implements IGetDoctorRequestUseCase {
  constructor(private doctorReqRepo: IDoctorRequest) {}
  async execute(id: string): Promise<DoctorRequest | null> {
    return await this.doctorReqRepo.findById(id);
  }
}
