import { DeleteDepartmentDTO } from "../../DTO/department/deleteDepartmentDTO";

export interface IRestoreDepartmentUseCase{
    execute(request:DeleteDepartmentDTO):Promise<void>
}