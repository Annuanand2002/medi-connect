import FileEntity from "../../../domain/entities/common/file.entity";
import { Department } from "../../../shared/constants/department";



export interface ApplyDoctorRequestDTO{
    fullName : string;
    email : string;
    dateOfBirth : Date;
    qualification : string;
    experience : number;
    department : Department;
    profileImg ?: FileEntity;
    governmentId : FileEntity;
    medicalLicense : FileEntity;
    degreeCertificates : FileEntity[];
}