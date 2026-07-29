import { Department } from "../../../domain/entities/department/department.entities";
import { UpdateDepartmentDTO } from "../../DTO/department/updateDepartmentDTO";


export interface IUpdateDepartmentUseCase{
    execute(request:UpdateDepartmentDTO):Promise<Department>
}