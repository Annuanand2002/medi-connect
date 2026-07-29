import { DoctorRequestFileService } from "../../application/services/DoctorRequestFileService";
import { ApproveDoctorRequestUsecase } from "../../application/useCases/doctor/ApproveDoctorRequestUsecase.imp";
import { VerifyDoctorSetupTokenUseCase } from "../../application/useCases/doctor/auth/VerifydoctorSetupToken.usecase";
import { DoctorRequestUsecase } from "../../application/useCases/doctor/ApplyDoctorRequestUsecase";
import { GetAllDoctorRequestUseCase } from "../../application/useCases/doctor/GetAllDoctorRequest.usecase";
import { GetDoctorRequestUseCase } from "../../application/useCases/doctor/GetDoctorRequest.usecase";
import { GetDoctorRetryRequest } from "../../application/useCases/doctor/GetDoctorRetryRequest.usecse";
import { RejectdoctorRequestUseCase } from "../../application/useCases/doctor/RejectDoctorRequest.usecase";
import { DepartmentRepo } from "../../infrastructure/repositories/department/departmentRepo.imp";
import { DoctorRepo } from "../../infrastructure/repositories/doctor/doctor.repo.impl";
import { DoctorRequestRepository } from "../../infrastructure/repositories/doctor/doctorRequest.repo.imp";
import { DoctorRetryTokenRepository } from "../../infrastructure/repositories/doctor/doctorRetryToken.repo";
import DoctorVerificationTokenRepository from "../../infrastructure/repositories/doctor/doctorVerificationToken.repo.ompl";
import { CloudinaryFileUploadService } from "../../infrastructure/services/cloudinaryFileUpload";
import EmailService from "../../infrastructure/services/emailService";
import ApproveDoctorRequestController from "../controllers/doctor/approveDoctorReq.controller";
import { DoctorRequestController } from "../controllers/doctor/doctor.req.controller";
import { GetRetryDoctorRequestController } from "../controllers/doctor/getRetryDoctorRequest.controller";
import { RejectDoctorRequestController } from "../controllers/doctor/rejectDoctirRequest.controller";
import { VerifyDoctorSetupTokenController } from "../controllers/doctor/verifyDoctorSetupToken.controller";
import { RetryDoctorRequestUseCase } from "../../application/useCases/doctor/RetryDoctorRequest";
import { RetryDoctorRequestController } from "../controllers/doctor/retryDoctorRequest.controller";

//apply
const doctorRepo = new DoctorRepo();
const doctorRequestRep = new DoctorRequestRepository();
const fileUploadService = new CloudinaryFileUploadService();
const getAllRequestUseCase = new GetAllDoctorRequestUseCase(doctorRequestRep);
const getDoctorRequestUseCase = new GetDoctorRequestUseCase(doctorRequestRep);
const doctorRequestFileService = new DoctorRequestFileService(
  fileUploadService,
);
const doctorRequestUseCase = new DoctorRequestUsecase(
  doctorRepo,
  doctorRequestRep,
  doctorRequestFileService,
);
export const doctorRequestController = new DoctorRequestController(
  doctorRequestUseCase,
  getAllRequestUseCase,
  getDoctorRequestUseCase,
);

//approve
const departmentRepo = new DepartmentRepo();
const doctorVerfTokenRepo = new DoctorVerificationTokenRepository();
const emailService = new EmailService();
const approveUsecase = new ApproveDoctorRequestUsecase(
  doctorRequestRep,
  departmentRepo,
  doctorRepo,
  doctorVerfTokenRepo,
  emailService,
);
export const approveDoctorReqController = new ApproveDoctorRequestController(
  approveUsecase,
);

//verifyToken
const verificationTokenusecase = new VerifyDoctorSetupTokenUseCase(
  doctorRepo,
  doctorVerfTokenRepo,
);
export const verificationTokenController = new VerifyDoctorSetupTokenController(
  verificationTokenusecase,
);
const doctorRetryTokenRepo = new DoctorRetryTokenRepository();
const getDoctorRetryRequestUseCase = new GetDoctorRetryRequest(
  doctorRequestRep,
  doctorRetryTokenRepo,
);
export const getDoctorRetryRequestController =
  new GetRetryDoctorRequestController(getDoctorRetryRequestUseCase);

//reject
const rejectUseCase = new RejectdoctorRequestUseCase(
  doctorRequestRep,
  emailService,
  doctorRetryTokenRepo,
);
export const rejectController = new RejectDoctorRequestController(
  rejectUseCase,
);

//retry
const doctorRetryToken = new DoctorRetryTokenRepository();
const retryDoctorRequestUseCase = new RetryDoctorRequestUseCase(
  doctorRequestRep,
  doctorRetryToken,
  doctorRequestFileService,
);
export const retryDoctorRequestController = new RetryDoctorRequestController(
  retryDoctorRequestUseCase,
);
