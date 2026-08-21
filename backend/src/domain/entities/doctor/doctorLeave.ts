export interface DoctorLeave{
    id : string;
    doctorId : string;
    startDate : Date;
    endDate : Date;
    reason : string;
    isDeleted : boolean;
    createdAt : Date;
    updatedAt : Date;
}