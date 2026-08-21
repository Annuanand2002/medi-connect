export interface DoctorBlock {
  id: string;
  doctorId: string;
  date : Date;
  startTime: string;
  endTime: string;
  reason: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
