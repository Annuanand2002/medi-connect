import FileEntity from "../../../domain/entities/common/file.entity";



export interface ApplyDoctorRequestDTO{
    fullName : string;
    email : string;
    dateOfBirth : Date;
    qualification : string;
    experience : number;
    specialization : string;
    profileImg ?: FileEntity;
    governmentId : FileEntity;
    medicalLicense : FileEntity;
    degreeCertificates : FileEntity[];
}