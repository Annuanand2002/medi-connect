
import { UploadFile } from "../../domain/entities/doctor/doctorRequestEntity";
import { ApplyDoctorRequestDTO } from "../DTO/doctorRequet/applyDoctorRequestDTO";

export interface UploadedDoctorRequestFiles{
    profileImg ? : UploadFile;
    governmentId : UploadFile;
    medicalLicense : UploadFile;
    degreeCertificates : UploadFile[];
}

export interface IDoctorRequestFileService {
    uploadFiles(dto:ApplyDoctorRequestDTO):Promise<UploadedDoctorRequestFiles>
}