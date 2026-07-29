import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { DeleteDepartmentDTO } from "../../DTO/department/deleteDepartmentDTO";
import { IDeleteDepartmentUseCase } from "./IDeleteDepartmentUseCase";


export class DeleteDepartmentUseCase implements IDeleteDepartmentUseCase{
    constructor(private departmentRepo:IDepartmentRepo){}
    async execute(request: DeleteDepartmentDTO): Promise<void> {
        const deaprtment = await this.departmentRepo.findById(request.id)
        if(!deaprtment){
            throw new AppError("Department not found",HTTP_STATUS.NOT_FOUND)
        }
        if(!deaprtment.isActive){
            throw new AppError ("Department is already disabled",HTTP_STATUS.BAD_REQUEST)
        }
        const updatedDepartment = await this.departmentRepo.update(request.id,{
            isActive:false
        })
        if(!updatedDepartment){
            throw new AppError("Failed to update the deprtment",HTTP_STATUS.INTERNAL_SERVER_ERROR)
        }
        //doctor is there check
        return;
    }
}