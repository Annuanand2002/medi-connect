import { SetPasswordUsecase } from "../../application/useCases/doctor/auth/SetPassword.usecase";
import { DoctorRepo } from "../../infrastructure/repositories/doctor/doctor.repo.impl";
import DoctorVerificationTokenRepository from "../../infrastructure/repositories/doctor/doctorVerificationToken.repo.ompl";
import { HashService } from "../../infrastructure/services/hashService.repo.imple";
import { SetDoctorPasswordController } from "../controllers/doctor/setDoctorPassword.controller";

const doctorRepo = new DoctorRepo();
const verificationTokenRepo = new DoctorVerificationTokenRepository();
const hashService = new HashService();
const setPasswordUsecase = new SetPasswordUsecase(
  doctorRepo,
  verificationTokenRepo,
  hashService,
);
export const setPasswordController = new SetDoctorPasswordController(
  setPasswordUsecase,
);
