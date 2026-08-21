import { Patient } from "../../../entities/patient/patient.entity";


export interface ITogglePatientUseCase {
  execute(id: string): Promise<Patient>;
}
