import { inject, injectable } from "inversify";
import { IGetAllPatientsUSeCase } from "../../../domain/repositories/patient/IGetAllpatients";
import { TYPES } from "../../../di/types/types";
import {
  GetPatientReqDTO,
  PaginationPatientResDTO,
} from "../../DTO/patient/getPatient";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";

@injectable()
export class GetAllPatientUseCase implements IGetAllPatientsUSeCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
  ) {}
  async execute(dto: GetPatientReqDTO): Promise<PaginationPatientResDTO> {
    return await this._patientRepo.findPatient(dto);
  }
}
