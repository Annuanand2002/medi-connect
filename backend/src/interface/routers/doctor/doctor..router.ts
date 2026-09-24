import { Router } from "express";
import upload from "../../../shared/config/multer";
import { TYPES } from "../../../di/types/types";
import container from "../../../di/container/container";
import { ROUTES } from "../../../shared/constants/routes";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ITokenService } from "../../../domain/services/ITokenService";
import { checkDoctorBlocked } from "../../../shared/middlewares/doctorBlock";
import { AppointmentController } from "../../controllers/appoinment.controller";
import { DoctorController } from "../../controllers/doctor.controller";
import { DoctorRequestController } from "../../controllers/doctorRequest.controller";

const router = Router();

const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);
const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticateDoctor = authenticate(tokenService, "doctor");

const doctorController = container.get<DoctorController>(TYPES.DoctorController)


const appointmentController = container.get<AppointmentController>(
  TYPES.AppointmentController,
);

//account set-up
router.post(
  ROUTES.DOCTOR.REGISTER,
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
    { name: "degreeCertificates", maxCount: 10 },
  ]),
  doctorRequestController.applyDoctorRequest,
);
router.post(ROUTES.DOCTOR.PASSWORD.SET, doctorController.setPassword);
router.get(ROUTES.DOCTOR.RETRYREQUEST, doctorRequestController.getRetry);
router.post(
  "/retry",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
    { name: "degreeCertificates", maxCount: 10 },
  ]),
  doctorRequestController.handle,
);
//authentication
router.post(ROUTES.AUTH.LOGIN, doctorController.login);
router.post(
  ROUTES.AUTH.REFRESH_TOKEN,
  doctorController.refreshToken,
);
router.post(ROUTES.AUTH.LOGOUT, doctorController.logout);
router.patch(
  ROUTES.DOCTOR.PASSWORD.RETRY,
  doctorController.requestReset,
);
router.patch(
  ROUTES.DOCTOR.PASSWORD.RESET,
  doctorController.resetPassword,
);

router.use(authenticateDoctor, checkDoctorBlocked);
//availability
router.post(ROUTES.DOCTOR.CREATE, doctorController.createAvail);

router.post(ROUTES.DOCTOR.UPDATE, doctorController.updateAvail);

router.patch(ROUTES.DOCTOR.UPDATE, doctorController.deleteAvail);
router.get(ROUTES.DOCTOR.GET, doctorController.getAvailability);

//leave
router.get(ROUTES.DOCTOR.GETLEAVE, doctorController.getAllLeave);
router.post(ROUTES.DOCTOR.CREATELEAVE, doctorController.createLeave);
router.put(ROUTES.DOCTOR.UPDATELEAVE, doctorController.updateLeave);
router.patch(ROUTES.DOCTOR.UPDATELEAVE, doctorController.deleteLeave);

//block

router.get(ROUTES.DOCTOR.BLOCK.GET, doctorController.getAllBlock);
router.post(ROUTES.DOCTOR.BLOCK.CREATE, doctorController.createBlock);
router.put(ROUTES.DOCTOR.BLOCK.UPDATE, doctorController.updateBlock);
router.patch(ROUTES.DOCTOR.BLOCK.UPDATE, doctorController.deleteBlock);

//appointment
router.get(ROUTES.DOCTOR.APPOINTMENT.GET, appointmentController.doctorGetAll);
router.get(
  ROUTES.DOCTOR.APPOINTMENT.DETAILS,
  appointmentController.doctorGetDetails,
);
router.get(
  ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.DATE,
  appointmentController.doctorGetDates,
);
router.get(
  ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.TIMESLOT,
  appointmentController.doctorTimeSlot,
);
router.patch(
  ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.UPDATE,
  appointmentController.doctorReschedule,
);

router.get(
  ROUTES.DOCTOR.APPOINTMENT.RESCHEDULE.CONFIRM,
  (req, res, next) => {
    console.log("🔥 CONFIRM ROUTE HIT");
    console.log("params:", req.params);
    console.log("query:", req.query);
    next();
  },
  appointmentController.getDoctorAppointmentDetails,
);

export default router;
