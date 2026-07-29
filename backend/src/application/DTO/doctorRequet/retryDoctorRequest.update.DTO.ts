import { ApplyDoctorRequestDTO } from "./applyDoctorRequestDTO";

export interface RetryDoctorRequestDTO extends ApplyDoctorRequestDTO{
  token: string;
}