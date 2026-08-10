import { CreatePatienResponsetDTO, CreatePatientDTO } from "../../DTO/patient/createPatientDTO";

export interface ICreatePatientUseCase {
    execute(dto:CreatePatientDTO):Promise<CreatePatienResponsetDTO>
}