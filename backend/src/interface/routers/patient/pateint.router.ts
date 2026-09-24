import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { checkPatientBlocked } from "../../../shared/middlewares/patientBlock";
import { ITokenService } from "../../../domain/services/ITokenService";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ROUTES } from "../../../shared/constants/routes";
import { AppointmentController } from "../../controllers/appoinment.controller";
import { PatientController } from "../../controllers/patient.controller";
import { DoctorController } from "../../controllers/doctor.controller";

const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticatePatient = authenticate(tokenService, "patient");

const patientController = container.get<PatientController>(TYPES.PatientController)
const appointmentController = container.get<AppointmentController>(
  TYPES.AppointmentController,
);
const doctorController = container.get<DoctorController>(TYPES.DoctorController)

//auth
router.post(ROUTES.PATIENT.CREATE, patientController.createPatient);
router.patch(ROUTES.PATIENT.VERIFY_OTP, patientController.verifyOTP);
router.post(ROUTES.PATIENT.RESEND_OTP, patientController.resendOTP);
router.post(ROUTES.AUTH.LOGIN, patientController.login);
router.post(ROUTES.AUTH.LOGOUT, patientController.logout);
router.post(
  ROUTES.AUTH.REFRESH_TOKEN,
  patientController.refreshToken,
);
router.patch(
  ROUTES.PATIENT.PASSWORD.REQUEST,
  patientController.requestReset,
);
router.patch(
  ROUTES.PATIENT.PASSWORD.RESET,
  patientController.resetPassword,
);

//appointment
router.use(authenticatePatient, checkPatientBlocked);

router.get(
  ROUTES.PATIENT.DOCTOTLIST,

  doctorController.getAll,
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
