import { Department } from "../../../domain/entities/department/department.entities";
import { CreateDepatmentDTO } from "../../DTO/department/createDepaertmentDTO";


export interface ICreateDepartmentUsecase {
  execute(request: CreateDepatmentDTO): Promise<Department>;
}
