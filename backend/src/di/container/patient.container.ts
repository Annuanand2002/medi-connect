import { Container } from "inversify";
import { TYPES } from "../types/types";
import { PatientRepo } from "../../infrastructure/repositories/patient/patient.repo";
import { PatientOTPRepo } from "../../infrastructure/repositories/patient/patientOTP.repo";
import { CreatePatientUSeCase } from "../../application/useCases/patient/createPatient.usecase";
import { CreatePatientController } from "../../interface/controllers/patient/createPatientController";
import { VerifyPatientOTPUsecase } from "../../application/useCases/patient/verifyPatientOTP.usecase";
import { VerifyPatientOTP } from "../../interface/controllers/patient/verfiyPatientOTP.controller";
import { ResentOTPUsecase } from "../../application/useCases/patient/resentOTP.usecase";
import { ResendOTPController } from "../../interface/controllers/patient/resendOTP.controller";
import { LoginPatientUseCase } from "../../application/useCases/patient/LoginPatient.usecase";
import { LoginPatientController } from "../../interface/controllers/patient/patientLogin.controller";
import { LogoutPatientUseCase } from "../../application/useCases/patient/PatinetLogout.usecase";
import { PatientLogoutController } from "../../interface/controllers/patient/logout.controller";
import { RefreshPatientToken } from "../../application/useCases/patient/refreshToken.usecase";
import { RefreshPatientTokenController } from "../../interface/controllers/patient/refreshToken.controller";
import { PatientrResetTokenRepo } from "../../infrastructure/repositories/patient/patientResetToken.repo";
import { RequestPatientForgetPasswordUseCase } from "../../application/useCases/patient/requestForgetPassword";
import { ResetPatientPassowrd } from "../../application/useCases/patient/resetpassword.usecase";
import { RequestPatientResetPasswordController } from "../../interface/controllers/patient/requestForgetPassword";
import { ResetPatientPasswordController } from "../../interface/controllers/patient/resetPassword";
import { GetAllPatientUseCase } from "../../application/useCases/patient/getAllPatient";
import { PatientController } from "../../interface/controllers/patient/patient.controller";
import { TogglePatientUsecase } from "../../application/useCases/patient/toggle.usecase";

export function patientBinding(container: Container) {
  container.bind(TYPES.PatientRepo).to(PatientRepo);
  container.bind(TYPES.PatientOTPRepo).to(PatientOTPRepo);
  container.bind(TYPES.CreatePatientUSeCase).to(CreatePatientUSeCase);
  container.bind(TYPES.CreatePatientController).to(CreatePatientController);
  container.bind(TYPES.VerifyPatientOTPUsecase).to(VerifyPatientOTPUsecase);
  container.bind(TYPES.VerifyPatientOTP).to(VerifyPatientOTP);
  container.bind(TYPES.ResentOTPUsecase).to(ResentOTPUsecase);
  container.bind(TYPES.ResendOTPController).to(ResendOTPController);
  container.bind(TYPES.LoginPatientUseCase).to(LoginPatientUseCase);
  container.bind(TYPES.LoginPatientController).to(LoginPatientController);
  container.bind(TYPES.LogoutPatientUseCase).to(LogoutPatientUseCase);
  container.bind(TYPES.PatientLogoutController).to(PatientLogoutController);
  container.bind(TYPES.RefreshPatientToken).to(RefreshPatientToken);
  container.bind(TYPES.RefreshPatientTokenController).to(RefreshPatientTokenController);
  container.bind(TYPES.PatientrResetTokenRepo).to(PatientrResetTokenRepo);
  container.bind(TYPES.RequestPatientForgetPasswordUseCase).to(RequestPatientForgetPasswordUseCase)
  container.bind(TYPES.ResetPatientPassowrd).to(ResetPatientPassowrd);
  container.bind(TYPES.RequestPatientResetPasswordController).to(RequestPatientResetPasswordController)
  container.bind(TYPES.ResetPatientPasswordController).to(ResetPatientPasswordController)
  container.bind(TYPES.GetAllPatientUseCase).to(GetAllPatientUseCase)
  container.bind(TYPES.PatientController).to(PatientController)
  container.bind(TYPES.TogglePatientUsecase).to(TogglePatientUsecase)
}
