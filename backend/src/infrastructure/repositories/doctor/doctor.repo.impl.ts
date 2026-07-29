import Doctor from "../../../domain/entities/doctor/doctor.entity";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import DoctorMapper from "../../database/mappers/DoctorMapper";
import DoctorModel from "../../database/models/doctor.model";



export class DoctorRepo implements IDoctorRepo{
    async create(data: Partial<Doctor>): Promise<Doctor> {
        const doctor = await DoctorModel.create(data);
        return DoctorMapper.toDomain(doctor)
    }
    async findById(id: string): Promise<Doctor | null> {
        const doctor = await DoctorModel.findById(id)
        if(!doctor)return null;
        return DoctorMapper.toDomain(doctor)
    }
    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await DoctorModel.findOne({email:email.toLowerCase()})
        return doctor?DoctorMapper.toDomain(doctor):null;
    }
    async update(id: string, data: Partial<Doctor>): Promise<Doctor | null> {
        const document = await DoctorModel.findByIdAndUpdate(id,data,{new:true})
        if(!document)return null;
        return DoctorMapper.toDomain(document)
    }
    async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
        await DoctorModel.findByIdAndUpdate(id,{refreshToken})
    }
    async countByDepartment(departmentId: string): Promise<number> {
        return await DoctorModel.countDocuments({departmentId,status:{$ne:"BLOCKED"}})
    }
    async findLastdoctor(): Promise<Doctor | null> {
        const doctor = await DoctorModel.findOne().sort({createAt:-1})
        return doctor?DoctorMapper.toDomain(doctor):null;
    }
}