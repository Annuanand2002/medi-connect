import { Container } from "inversify";
import { TYPES } from "../types/types";
import { DoctorRepo } from "../../infrastructure/repositories/doctor/doctor.repo.impl";
import { DoctorRequestRepository } from "../../infrastructure/repositories/doctor/doctorRequest.repo.imp";
import { DoctorRequestFileService } from "../../infrastructure/services/DoctorRequestFileService";
import { DoctorRequestUsecase } from "../../application/useCases/doctor/ApplyDoctorRequestUsecase";
import { GetAllDoctorRequestUseCase } from "../../application/useCases/doctor/GetAllDoctorRequest.usecase";
import { GetDoctorRequestUseCase } from "../../application/useCases/doctor/GetDoctorRequest.usecase";
import { DoctorRequestController } from "../../interface/controllers/doctor/doctor.req.controller";
import DoctorVerificationTokenRepository from "../../infrastructure/repositories/doctor/doctorVerificationToken.repo.ompl";
import { ApproveDoctorRequestUsecase } from "../../application/useCases/doctor/ApproveDoctorRequestUsecase.imp";
import ApproveDoctorRequestController from "../../interface/controllers/doctor/approveDoctorReq.controller";
import { VerifyDoctorSetupTokenUseCase } from "../../application/useCases/doctor/auth/VerifydoctorSetupToken.usecase";
import { VerifyDoctorSetupTokenController } from "../../interface/controllers/doctor/verifyDoctorSetupToken.controller";
import { DoctorRetryTokenRepository } from "../../infrastructure/repositories/doctor/doctorRetryToken.repo";
import { GetDoctorRetryRequest } from "../../application/useCases/doctor/GetDoctorRetryRequest.usecse";
import { GetRetryDoctorRequestController } from "../../interface/controllers/doctor/getRetryDoctorRequest.controller";
import { RejectdoctorRequestUseCase } from "../../application/useCases/doctor/RejectDoctorRequest.usecase";
import { RejectDoctorRequestController } from "../../interface/controllers/doctor/rejectDoctirRequest.controller";
import { RetryDoctorRequestUseCase } from "../../application/useCases/doctor/RetryDoctorRequest";
import { RetryDoctorRequestController } from "../../interface/controllers/doctor/retryDoctorRequest.controller";
import { SetPasswordUsecase } from "../../application/useCases/doctor/auth/SetPassword.usecase";
import { SetDoctorPasswordController } from "../../interface/controllers/doctor/setDoctorPassword.controller";
import { DoctorLoginUseCase } from "../../application/useCases/doctor/auth/loginDoctor.usecase.impl";
import { LoginDoctorController } from "../../interface/controllers/doctor/loginDoctor.controller";
import { RefreshDoctorUseCase } from "../../application/useCases/doctor/auth/doctorRefreshToken.usecase";
import { DoctorRefreshTokenController } from "../../interface/controllers/doctor/doctorRefrshToken.controller";
import { LogoutDoctorUseCase } from "../../application/useCases/doctor/auth/logoutDoctor.usecase";
import { DoctorLogoutController } from "../../interface/controllers/doctor/doctorLogout.controller";
import { RequestDoctorForgetPasswordUseCase } from "../../application/useCases/doctor/requestForgetPassword";
import { DoctorResetTokenRepo } from "../../infrastructure/repositories/doctor/doctorResetToken.impl";
import { RequestResetPasswordController } from "../../interface/controllers/doctor/requestResetPassword.controller";
import { ResetDoctorPassowrd } from "../../application/useCases/doctor/resetPassword.usecase";
import { ResetDoctorPasswordController } from "../../interface/controllers/doctor/resetPassword.controller";

export function doctorBinding(container: Container) {
  container.bind(TYPES.DoctorRepo).to(DoctorRepo);
  container.bind(TYPES.DoctorRequestRepository).to(DoctorRequestRepository);
  container.bind(TYPES.DoctorRequestFileService).to(DoctorRequestFileService);
  container.bind(TYPES.DoctorRequestUsecase).to(DoctorRequestUsecase);
  container
    .bind(TYPES.GetAllDoctorRequestUseCase)
    .to(GetAllDoctorRequestUseCase);
  container.bind(TYPES.GetDoctorRequestUseCase).to(GetDoctorRequestUseCase);
  container.bind(TYPES.DoctorRequestController).to(DoctorRequestController);
  container
    .bind(TYPES.DoctorVerificationTokenRepository)
    .to(DoctorVerificationTokenRepository);
  container
    .bind(TYPES.ApproveDoctorRequestUsecase)
    .to(ApproveDoctorRequestUsecase);
  container
    .bind(TYPES.ApproveDoctorRequestController)
    .to(ApproveDoctorRequestController);
  container
    .bind(TYPES.VerifyDoctorSetupTokenUseCase)
    .to(VerifyDoctorSetupTokenUseCase);
  container
    .bind(TYPES.VerifyDoctorSetupTokenController)
    .to(VerifyDoctorSetupTokenController);
  container
    .bind(TYPES.DoctorRetryTokenRepository)
    .to(DoctorRetryTokenRepository);
  container.bind(TYPES.GetDoctorRetryRequest).to(GetDoctorRetryRequest);
  container
    .bind(TYPES.GetRetryDoctorRequestController)
    .to(GetRetryDoctorRequestController);
  container
    .bind(TYPES.RejectdoctorRequestUseCase)
    .to(RejectdoctorRequestUseCase);
  container
    .bind(TYPES.RejectDoctorRequestController)
    .to(RejectDoctorRequestController);
  container.bind(TYPES.RetryDoctorRequestUseCase).to(RetryDoctorRequestUseCase);
  container
    .bind(TYPES.RetryDoctorRequestController)
    .to(RetryDoctorRequestController);
  container.bind(TYPES.SetPasswordUsecase).to(SetPasswordUsecase);
  container
    .bind(TYPES.SetDoctorPasswordController)
    .to(SetDoctorPasswordController);
    container
    .bind(TYPES.DoctorLoginUseCase)
    .to(DoctorLoginUseCase)
    container
    .bind(TYPES.LoginDoctorController)
    .to(LoginDoctorController)
    container
    .bind(TYPES.RefreshDoctorUseCase)
    .to(RefreshDoctorUseCase)
    container
    .bind(TYPES.DoctorRefreshTokenController)
    .to(DoctorRefreshTokenController)
    container
    .bind(TYPES.LogoutDoctorUseCase)
    .to(LogoutDoctorUseCase)
    container
    .bind(TYPES.DoctorLogoutController)
    .to(DoctorLogoutController)
    container
    .bind(TYPES.RequestDoctorForgetPasswordUseCase)
    .to(RequestDoctorForgetPasswordUseCase)
    container
    .bind(TYPES.DoctorResetTokenRepo)
    .to(DoctorResetTokenRepo)
    container
    .bind(TYPES.RequestResetPasswordController)
    .to(RequestResetPasswordController)
    container
    .bind(TYPES.ResetDoctorPassowrd)
    .to(ResetDoctorPassowrd)
    container
    .bind(TYPES.ResetDoctorPasswordController)
    .to(ResetDoctorPasswordController)
}
