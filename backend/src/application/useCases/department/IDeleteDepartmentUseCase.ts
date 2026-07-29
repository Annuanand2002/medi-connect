import { DeleteDepartmentDTO } from "../../DTO/department/deleteDepartmentDTO";

export interface IDeleteDepartmentUseCase{
    execute(request:DeleteDepartmentDTO):Promise<void>
}