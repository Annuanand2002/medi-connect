export interface UploadFile {
    url : string;
    publicId : string
}

interface DoctorRequest{
   id ?: string;
   fullName : string;
   email : string;
   dateOfBirth : Date;
   specialization : string;
   profileImg ?: UploadFile;
   qualification : string;
   experience : number;
   governmentId : UploadFile
   medicalLicense : UploadFile
   degreeCertificates : UploadFile[];
   status : "PENDING"|"APPROVED"|"REJECTED";
   rejectReason ?: string;
   rejectCount : number;
   createdAt ?: Date;
   updatedAt ?: Date;
}

export default DoctorRequest;