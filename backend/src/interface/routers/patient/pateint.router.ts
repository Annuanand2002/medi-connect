import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { CreatePatientController } from "../../controllers/patient/createPatientController";
import { AuthPatientController } from "../../controllers/patient/patientauth.controller";
import { RefreshPatientTokenController } from "../../controllers/patient/refreshToken.controller";
import { ResetPatientPasswordController } from "../../controllers/patient/resetPassword";
import { checkPatientBlocked } from "../../../shared/middlewares/patientBlock";
import { ITokenService } from "../../../domain/services/ITokenService";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ROUTES } from "../../../shared/constants/routes";
import { GetDoctorsController } from "../../controllers/patient/GetDoctorsController";
import { AppointmentController } from "../../controllers/appoinment.controller";

const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticatePatient = authenticate(tokenService, "patient");
const createPatientController = container.get<CreatePatientController>(
  TYPES.CreatePatientController,
);

const authPatientController = container.get<AuthPatientController>(
  TYPES.AuthPatientController,
);
const refreshPatientTokenController =
  container.get<RefreshPatientTokenController>(
    TYPES.RefreshPatientTokenController,
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
router.post(ROUTES.PATIENT.CREATE, createPatientController.createPatient);
router.patch(ROUTES.PATIENT.VERIFY_OTP, createPatientController.verifyOTP);
router.post(ROUTES.PATIENT.RESEND_OTP, createPatientController.resendOTP);
router.post(ROUTES.AUTH.LOGIN, authPatientController.login);
router.post(ROUTES.AUTH.LOGOUT, authPatientController.logout);
router.post(
  ROUTES.AUTH.REFRESH_TOKEN,
  refreshPatientTokenController.refreshToken,
);
router.patch(
  ROUTES.PATIENT.PASSWORD.REQUEST,
  resetPatientPasswordController.requestReset,
);
router.patch(
  ROUTES.PATIENT.PASSWORD.RESET,
  resetPatientPasswordController.resetPassword,
);

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
router.get(
  ROUTES.PATIENT.APPOINTMENT.GETPAGE,
  appointmentController.getAppointmentPage,
);
//cancel
router.patch(ROUTES.PATIENT.APPOINTMENT.CANCEL, appointmentController.cancel);
//reschedule
router.get(
  ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.DATE,
  appointmentController.getDates,
);
router.get(
  ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.TIMESLOT,
  appointmentController.getTimeSlot,
);
router.get(
  ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.CONFIRM,
  appointmentController.getAppointmentDetails,
);
router.patch(
  ROUTES.PATIENT.APPOINTMENT.RESCHEDULE.UPDATE,
  appointmentController.reschedule,
);

export default router;
