import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { CreatePatientController } from "../../controllers/patient/createPatientController";
import { VerifyPatientOTP } from "../../controllers/patient/verfiyPatientOTP.controller";
import { ResendOTPController } from "../../controllers/patient/resendOTP.controller";
import { LoginPatientController } from "../../controllers/patient/patientLogin.controller";
import { PatientLogoutController } from "../../controllers/patient/logout.controller";
import { RefreshPatientTokenController } from "../../controllers/patient/refreshToken.controller";
import { RequestPatientResetPasswordController } from "../../controllers/patient/requestForgetPassword";
import { ResetPatientPasswordController } from "../../controllers/patient/resetPassword";
import { checkPatientBlocked } from "../../../shared/middlewares/patientBlock";

const router = Router();

const createPatientController = container.get<CreatePatientController>(
  TYPES.CreatePatientController,
);
const verifyPatientOTPController = container.get<VerifyPatientOTP>(
  TYPES.VerifyPatientOTP,
);
const resendOTPController = container.get<ResendOTPController>(
  TYPES.ResendOTPController,
);
const loginPatientController = container.get<LoginPatientController>(
  TYPES.LoginPatientController,
);
const patientLogoutController = container.get<PatientLogoutController>(
  TYPES.PatientLogoutController,
);
const refreshPatientTokenController =
  container.get<RefreshPatientTokenController>(
    TYPES.RefreshPatientTokenController,
  );
const requestPatientResetPasswordController =
  container.get<RequestPatientResetPasswordController>(
    TYPES.RequestPatientResetPasswordController,
  );
const resetPatientPasswordController =
  container.get<ResetPatientPasswordController>(
    TYPES.ResetPatientPasswordController,
  );

//auth
router.post("/create-patient", createPatientController.createPatient);
router.patch("/verify-otp/:patientId", verifyPatientOTPController.verifyOTP);
router.post("/resend-otp/:patientId", resendOTPController.resendOTP);
router.post("/login",loginPatientController.login);
router.post("/logout", patientLogoutController.logout);
router.post("/refresh-token", refreshPatientTokenController.refreshToken);
router.patch(
  "/requeset-reset",
  requestPatientResetPasswordController.requestReset,
);
router.patch("/reset-password", resetPatientPasswordController.resetPassword);

export default router;
