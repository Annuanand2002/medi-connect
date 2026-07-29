import FileEntity from "../entities/common/file.entity";
import { UploadFile } from "../entities/doctor/doctorRequestEntity";



export interface IFileUploadService {
    upload(file :FileEntity,folder: string):Promise<UploadFile>;
    uploadMany(files:FileEntity[],folder:string):Promise<UploadFile[]>
}