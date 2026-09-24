import { Container } from "inversify";
import { TYPES } from "../types/types";
import { PatientRepo } from "../../infrastructure/repositories/patient/patient.repo";
import { PatientOTPRepo } from "../../infrastructure/repositories/patient/patientOTP.repo";
import { CreatePatientUSeCase } from "../../application/useCases/patient/createPatient.usecase";
import { VerifyPatientOTPUsecase } from "../../application/useCases/patient/verifyPatientOTP.usecase";
import { ResentOTPUsecase } from "../../application/useCases/patient/resentOTP.usecase";
import { LoginPatientUseCase } from "../../application/useCases/patient/LoginPatient.usecase";
import { LogoutPatientUseCase } from "../../application/useCases/patient/PatinetLogout.usecase";
import { RefreshPatientToken } from "../../application/useCases/patient/refreshToken.usecase";
import { PatientrResetTokenRepo } from "../../infrastructure/repositories/patient/patientResetToken.repo";
import { RequestPatientForgetPasswordUseCase } from "../../application/useCases/patient/requestForgetPassword";
import { ResetPatientPassowrd } from "../../application/useCases/patient/resetpassword.usecase";
import { GetAllPatientUseCase } from "../../application/useCases/patient/getAllPatient";
import { TogglePatientUsecase } from "../../application/useCases/patient/toggle.usecase";
import { GetDatesForAppointment } from "../../application/useCases/patient/getDateForAppointment";
import { AppointmentController } from "../../interface/controllers/appoinment.controller";
import { GetTimeSlotUseCase } from "../../application/useCases/patient/getTimeSlotForAppointment.usecase";
import { AppoitmentRepo } from "../../infrastructure/repositories/patient/appointment.repo";
import { CreateAppointmentUsecase } from "../../application/useCases/patient/createAppointment";
import { GetAppointmentDetailsUseCase } from "../../application/useCases/patient/getConfirmationPage";
import { GetAppointmentHistory } from "../../application/useCases/patient/getAppointmentHistory";
import { AppointmentDeatilsPage } from "../../application/useCases/patient/getSingleAppointmentHistory";
import { AppointmentCancel } from "../../application/useCases/patient/appointmentCancel";
import { AppointmentReschedule } from "../../application/useCases/patient/AppointmentReschedule.usecase";
import { SingleAppointmenytDetails } from "../../application/useCases/doctor/SingleAppointmentDetails";
import { PatientController } from "../../interface/controllers/patient.controller";

export function patientBinding(container: Container) {
  container.bind(TYPES.PatientRepo).to(PatientRepo);
  container.bind(TYPES.PatientOTPRepo).to(PatientOTPRepo);
  container.bind(TYPES.CreatePatientUSeCase).to(CreatePatientUSeCase);
  container.bind(TYPES.VerifyPatientOTPUsecase).to(VerifyPatientOTPUsecase);
  container.bind(TYPES.ResentOTPUsecase).to(ResentOTPUsecase);
  container.bind(TYPES.LoginPatientUseCase).to(LoginPatientUseCase);
  container.bind(TYPES.LogoutPatientUseCase).to(LogoutPatientUseCase);
  container.bind(TYPES.RefreshPatientToken).to(RefreshPatientToken);
  container.bind(TYPES.PatientrResetTokenRepo).to(PatientrResetTokenRepo);
  container
    .bind(TYPES.RequestPatientForgetPasswordUseCase)
    .to(RequestPatientForgetPasswordUseCase);
  container.bind(TYPES.ResetPatientPassowrd).to(ResetPatientPassowrd);
  container.bind(TYPES.GetAllPatientUseCase).to(GetAllPatientUseCase);
  container.bind(TYPES.PatientController).to(PatientController);
  container.bind(TYPES.TogglePatientUsecase).to(TogglePatientUsecase);
  container.bind(TYPES.GetDatesForAppointment).to(GetDatesForAppointment);
  container.bind(TYPES.AppointmentController).to(AppointmentController);
  container.bind(TYPES.GetTimeSlotUseCase).to(GetTimeSlotUseCase);
  container.bind(TYPES.AppoitmentRepo).to(AppoitmentRepo);
  container.bind(TYPES.CreateAppointmentUsecase).to(CreateAppointmentUsecase);
  container
    .bind(TYPES.GetAppointmentDetailsUseCase)
    .to(GetAppointmentDetailsUseCase);
  container.bind(TYPES.GetAppointmentHistory).to(GetAppointmentHistory);
  container.bind(TYPES.AppointmentDeatilsPage).to(AppointmentDeatilsPage);
  container.bind(TYPES.AppointmentCancel).to(AppointmentCancel);
  container.bind(TYPES.AppointmentReschedule).to(AppointmentReschedule);
  container.bind(TYPES.SingleAppointmenytDetails).to(SingleAppointmenytDetails);
}
