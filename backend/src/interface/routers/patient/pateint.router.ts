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
import { ITokenService } from "../../../domain/services/ITokenService";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ROUTES } from "../../../shared/constants/routes";
import { GetDoctorsController } from "../../controllers/patient/GetDoctorsController";
import { AppointmentController } from "../../controllers/patient/appoinment.controller";

const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticatePatient = authenticate(tokenService, "patient");
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

const getDoctorController = container.get<GetDoctorsController>(
  TYPES.GetDoctorsController,
);

const appointmentController = container.get<AppointmentController>(
  TYPES.AppointmentController,
);

//auth
router.post("/create-patient", createPatientController.createPatient);
router.patch("/verify-otp/:patientId", verifyPatientOTPController.verifyOTP);
router.post("/resend-otp/:patientId", resendOTPController.resendOTP);
router.post("/login", loginPatientController.login);
router.post("/logout", patientLogoutController.logout);
router.post("/refresh-token", refreshPatientTokenController.refreshToken);
router.patch(
  "/requeset-reset",
  requestPatientResetPasswordController.requestReset,
);
router.patch("/reset-password", resetPatientPasswordController.resetPassword);

//appointment
router.use(authenticatePatient, checkPatientBlocked);

router.get(
  ROUTES.PATIENT.DOCTOTLIST,

  getDoctorController.getAll,
);

router.get(
  ROUTES.PATIENT.GETDATES,

  appointmentController.getDates,
);
router.get(ROUTES.PATIENT.GETTIMESLOT, appointmentController.getTimeSlot);
router.get(
  ROUTES.PATIENT.GETDETAIlS,
  appointmentController.getAppointmentDetails,
);
router.post(ROUTES.PATIENT.APPOINTMENT.CREATE, appointmentController.create);

router.get(
  ROUTES.PATIENT.APPOINTMENT.GET,
  appointmentController.getAppointmentHistory,
);

export default router;
