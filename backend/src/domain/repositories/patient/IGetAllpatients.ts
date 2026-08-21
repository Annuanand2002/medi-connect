import { GetPatientReqDTO, PaginationPatientResDTO } from "../../../application/DTO/patient/getPatient";

export interface IGetAllPatientsUSeCase {
    execute(dto:GetPatientReqDTO):Promise<PaginationPatientResDTO>
}