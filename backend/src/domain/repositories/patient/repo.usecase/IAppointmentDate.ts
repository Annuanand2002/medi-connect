import {
  Dates,
  PatientRequestDate,
} from "../../../../application/DTO/patient/appointment";

export interface IGetDatesForAppointmentUsecase {
  execute(dto: PatientRequestDate): Promise<Dates[]>;
}
