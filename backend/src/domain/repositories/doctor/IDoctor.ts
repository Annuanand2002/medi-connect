import Doctor from "../../entities/doctor/doctor.entity";


export interface IDoctorRepo{
    create(data:Partial<Doctor>):Promise<Doctor>;
    findById(id:string):Promise<Doctor|null>;
    findByEmail(email:string):Promise<Doctor|null>;
    update(id:string,data:Partial<Doctor>):Promise<Doctor|null>;
    updateRefreshToken(id:string,refreshToken:string|null):Promise<void>
    countByDepartment(departmentId:string):Promise<number>
    findLastdoctor():Promise<Doctor|null>
}