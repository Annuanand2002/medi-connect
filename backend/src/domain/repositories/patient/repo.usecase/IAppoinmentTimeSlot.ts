import { AvailableTimeSlot } from "../../../../application/DTO/patient/appointment";

export interface IGetTimeSlotForAppointment {
  execute(doctorId: string, date: Date): Promise<AvailableTimeSlot[]>;
}
