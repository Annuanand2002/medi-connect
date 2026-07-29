import { Department } from "../../../domain/entities/department/department.entities";
import { DepartmentDocument } from "../models/department.model";


export class DepartmentMapper {
    static toDomain(document:DepartmentDocument):Department{
        return {
            id : document._id.toString(),
            name : document.name,
            departmentCode : document.departmentCode??undefined,
            description : document.description,
            isActive : document.isActive,
            createdAt : document.createdAt,
            updatedAt : document.updatedAt
        }
    }
}