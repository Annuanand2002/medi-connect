import { Patient } from "../../entities/patient/patient.entity";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IPatientRepo extends IBaseRepository<Patient|null> {
  create(data : Patient):Promise<Patient>;
  findByEmail(email:string):Promise<Patient|null>
  update(id:string,data:Partial<Patient>):Promise<Patient|null>;
  updateRefreshToken(id:string,refreshToken:string|null):Promise<void>
}