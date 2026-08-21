import { CreatePatienResponsetDTO, CreatePatientDTO } from "../../../../application/DTO/patient/createPatientDTO";


export interface ICreatePatientUseCase {
    execute(dto:CreatePatientDTO):Promise<CreatePatienResponsetDTO>
}