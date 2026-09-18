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
import { VerifyDoctorSetupTokenUseCase } from "../../application/useCases/doctor/auth/VerifydoctorSetupToken.usecase";
import { VerifyDoctorSetupTokenController } from "../../interface/controllers/doctor/verifyDoctorSetupToken.controller";
import { DoctorRetryTokenRepository } from "../../infrastructure/repositories/doctor/doctorRetryToken.repo";
import { GetDoctorRetryRequest } from "../../application/useCases/doctor/GetDoctorRetryRequest.usecse";
import { RejectdoctorRequestUseCase } from "../../application/useCases/doctor/RejectDoctorRequest.usecase";
import { RetryDoctorRequestUseCase } from "../../application/useCases/doctor/RetryDoctorRequest";
import { RetryDoctorRequestController } from "../../interface/controllers/doctor/retryDoctorRequest.controller";
import { SetPasswordUsecase } from "../../application/useCases/doctor/auth/SetPassword.usecase";
import { SetDoctorPasswordController } from "../../interface/controllers/doctor/setDoctorPassword.controller";
import { DoctorLoginUseCase } from "../../application/useCases/doctor/auth/loginDoctor.usecase.impl";
import { AuthDoctorController } from "../../interface/controllers/doctor/authDoctor.controller";
import { RefreshDoctorUseCase } from "../../application/useCases/doctor/auth/doctorRefreshToken.usecase";
import { DoctorRefreshTokenController } from "../../interface/controllers/doctor/doctorRefrshToken.controller";
import { LogoutDoctorUseCase } from "../../application/useCases/doctor/auth/logoutDoctor.usecase";
import { RequestDoctorForgetPasswordUseCase } from "../../application/useCases/doctor/requestForgetPassword";
import { DoctorResetTokenRepo } from "../../infrastructure/repositories/doctor/doctorResetToken.impl";
import { ResetDoctorPassowrd } from "../../application/useCases/doctor/resetPassword.usecase";
import { ResetDoctorPasswordController } from "../../interface/controllers/doctor/resetPassword.controller";
import { GetAllDoctorsUSeCase } from "../../application/useCases/doctor/GetAllDoctors.usecase";
import { DoctorController } from "../../interface/controllers/admin/doctors.controller";
import { ToggelDoctorStatus } from "../../application/useCases/doctor/ToogleDoctorStatus.usecase";
import { DoctorAvailabilityRepo } from "../../infrastructure/repositories/doctor/doctorAvailability.repo";
import { CreateDoctorAvailUseCase } from "../../application/useCases/doctor/createDoctorAvailbility.usecase";
import { DoctorAvailController } from "../../interface/controllers/doctor/doctorAvailability.controller";
import { UpdateDoctorAvailabilityUseCase } from "../../application/useCases/doctor/updateDoctorAvailability.usecase";
import { DeleteDoctorAvailUsecase } from "../../application/useCases/doctor/DeleteDoctorAvail.usecase";
import { GetDoctorAvailUsecase } from "../../application/useCases/doctor/GetDoctorAvailability.usecase";
import { DoctorLeaveRepo } from "../../infrastructure/repositories/doctor/doctorLeave.repo";
import { CreateDoctorLeave } from "../../application/useCases/doctor/CreateDoctorLeave.usecase";
import { UpdateDoctorLeave } from "../../application/useCases/doctor/updateDoctorLeave.usecase";
import { DeleteDoctorLeaveusecase } from "../../application/useCases/doctor/deleteDoctorLeave.usecase";
import { GetAllDoctorLeaveUsecase } from "../../application/useCases/doctor/GetAllDoctorLeave.usecase";
import { DoctorLeaveController } from "../../interface/controllers/doctor/doctorLeave.controller";
import { DoctorBlockRepo } from "../../infrastructure/repositories/doctor/doctorBlock.repo";
import { CreateDoctorBlockUseCase } from "../../application/useCases/doctor/CreateDoctorBlock";
import { UpdateDoctorBlockUsecase } from "../../application/useCases/doctor/UpdateDoctorBlock.usecase";
import { DeleteDoctorBlockUsecase } from "../../application/useCases/doctor/DeleteDoctorBlock.usecase";
import { GetDoctorBlockUsecase } from "../../application/useCases/doctor/GetDoctorBlock.usecase";
import { DoctorBlockController } from "../../interface/controllers/doctor/doctorBlock.controller";
import { GetAppointmentDoctorHistory } from "../../application/useCases/doctor/IAppointmentHistory";
import { DoctorAppointmentCOntroller } from "../../interface/controllers/doctor/appointment.doctor.controlller";
import ActionDoctorRequestController from "../../interface/controllers/admin/actionDoctorReq.controller";
import { AppointmentDoctorReschedule } from "../../application/useCases/doctor/AppointmentDoctorReschdule.usecase";

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
    .bind(TYPES.ActionDoctorRequestController)
    .to(ActionDoctorRequestController);
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
    .bind(TYPES.RejectdoctorRequestUseCase)
    .to(RejectdoctorRequestUseCase);
  container.bind(TYPES.RetryDoctorRequestUseCase).to(RetryDoctorRequestUseCase);
  container
    .bind(TYPES.RetryDoctorRequestController)
    .to(RetryDoctorRequestController);
  container.bind(TYPES.SetPasswordUsecase).to(SetPasswordUsecase);
  container
    .bind(TYPES.SetDoctorPasswordController)
    .to(SetDoctorPasswordController);
  container.bind(TYPES.DoctorLoginUseCase).to(DoctorLoginUseCase);
  container.bind(TYPES.AuthDoctorController).to(AuthDoctorController);
  container.bind(TYPES.RefreshDoctorUseCase).to(RefreshDoctorUseCase);
  container
    .bind(TYPES.DoctorRefreshTokenController)
    .to(DoctorRefreshTokenController);
  container.bind(TYPES.LogoutDoctorUseCase).to(LogoutDoctorUseCase);
  container
    .bind(TYPES.RequestDoctorForgetPasswordUseCase)
    .to(RequestDoctorForgetPasswordUseCase);
  container.bind(TYPES.DoctorResetTokenRepo).to(DoctorResetTokenRepo);
  container.bind(TYPES.ResetDoctorPassowrd).to(ResetDoctorPassowrd);
  container
    .bind(TYPES.ResetDoctorPasswordController)
    .to(ResetDoctorPasswordController);
  container.bind(TYPES.GetAllDoctorsUSeCase).to(GetAllDoctorsUSeCase);
  container.bind(TYPES.DoctorController).to(DoctorController);
  container.bind(TYPES.ToggelDoctorStatus).to(ToggelDoctorStatus);
  container.bind(TYPES.DoctorAvailabilityRepo).to(DoctorAvailabilityRepo);
  container.bind(TYPES.CreateDoctorAvailUseCase).to(CreateDoctorAvailUseCase);
  container.bind(TYPES.DoctorAvailController).to(DoctorAvailController);
  container
    .bind(TYPES.UpdateDoctorAvailabilityUseCase)
    .to(UpdateDoctorAvailabilityUseCase);
  container.bind(TYPES.DeleteDoctorAvailUsecase).to(DeleteDoctorAvailUsecase);
  container.bind(TYPES.GetDoctorAvailUsecase).to(GetDoctorAvailUsecase);
  container.bind(TYPES.DoctorLeaveRepo).to(DoctorLeaveRepo);
  container.bind(TYPES.CreateDoctorLeave).to(CreateDoctorLeave);
  container.bind(TYPES.UpdateDoctorLeave).to(UpdateDoctorLeave);
  container.bind(TYPES.DeleteDoctorLeaveusecase).to(DeleteDoctorLeaveusecase);
  container.bind(TYPES.GetAllDoctorLeaveUsecase).to(GetAllDoctorLeaveUsecase);
  container.bind(TYPES.DoctorLeaveController).to(DoctorLeaveController);
  container.bind(TYPES.DoctorBlockRepo).to(DoctorBlockRepo);
  container.bind(TYPES.CreateDoctorBlockUseCase).to(CreateDoctorBlockUseCase);
  container.bind(TYPES.UpdateDoctorBlockUsecase).to(UpdateDoctorBlockUsecase);
  container.bind(TYPES.DeleteDoctorBlockUsecase).to(DeleteDoctorBlockUsecase);
  container.bind(TYPES.GetDoctorBlockUsecase).to(GetDoctorBlockUsecase);
  container.bind(TYPES.DoctorBlockController).to(DoctorBlockController);
  container
    .bind(TYPES.GetAppointmentDoctorHistory)
    .to(GetAppointmentDoctorHistory);
  container
    .bind(TYPES.DoctorAppointmentCOntroller)
    .to(DoctorAppointmentCOntroller);
    container
    .bind(TYPES.AppointmentDoctorReschedule).to(AppointmentDoctorReschedule)
}
