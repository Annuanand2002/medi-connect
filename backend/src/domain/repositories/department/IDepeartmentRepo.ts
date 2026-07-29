import { Department } from "../../entities/department/department.entities";



export interface IDepartmentRepo{
    create(data:Partial<Department>):Promise<Department>;
    update(id:string,data:Partial<Department>):Promise<Department|null>;
    findById(id:string):Promise<Department|null>
    findByName(name:string):Promise<Department|null>
    findAll():Promise<Department[]>
    findlastDepartment():Promise<Department|null>
}