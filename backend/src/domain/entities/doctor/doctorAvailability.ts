import { Week } from "../../../shared/constants/week";

export interface DoctorAvailability{
    id : string;
    doctorId : string;
    dayOfWeek : Week;
    startTime : string;
    endTime : string;
    breaks :{
    startTime: string;
    endTime: string;
  }[];
    createdAt : Date;
    updatedAt : Date;
    isAvailable : boolean;
    isDeleted : boolean;
    duration : number;
}