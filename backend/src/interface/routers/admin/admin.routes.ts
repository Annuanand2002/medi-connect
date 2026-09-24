import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ITokenService } from "../../../domain/services/ITokenService";
import { GetFileURlController } from "../../controllers/service/getFileUrl.controller";
import { ROUTES } from "../../../shared/constants/routes";
import { AdminController } from "../../controllers/admin.controller";
import { DoctorRequestController } from "../../controllers/doctorRequest.controller";
import { DoctorController } from "../../controllers/doctor.controller";
import { PatientController } from "../../controllers/patient.controller";

const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticateAdmin = authenticate(tokenService, "admin");
const adminController = container.get<AdminController>(TYPES.AdminController);
const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);

const getFileURlController = container.get<GetFileURlController>(
  TYPES.GetFileURlController,
);
const doctorController = container.get<DoctorController>(TYPES.DoctorController)
const patientController = container.get<PatientController>(
  TYPES.PatientController,
);

router.post(ROUTES.AUTH.LOGIN, adminController.login);
router.post(ROUTES.AUTH.REFRESH_TOKEN, adminController.refreshToken);
router.post(ROUTES.AUTH.LOGOUT, adminController.logout);

//doctor-req
router.get(
  "/doctor-request",
  authenticateAdmin,
  doctorRequestController.getAllDoctorRequest,
);
router.get(
  "/doctor-request/file",
  authenticateAdmin,
  getFileURlController.getSignedFileUrl,
);
router.get(
  "/doctor-request/:id",
  authenticateAdmin,
  doctorRequestController.getDoctorReq,
);
router.patch(
  "/doctor-request/approve",
  authenticateAdmin,
  doctorRequestController.approve,
);
router.get("/setup-password", doctorController.verify);
router.patch(
  "/doctor-request/reject",
  authenticateAdmin,
  doctorRequestController.reject,
);
router.get(
  ROUTES.DOCTOR.GETALL,
  authenticateAdmin,
  doctorController.getAllDoctor,
);
router.patch(
  ROUTES.DOCTOR.TOGGLE,
  authenticateAdmin,
  doctorController.toggleStatus,
);
router.get(
  ROUTES.PATIENT.GETALL,
  authenticateAdmin,
  patientController.getAllPatient,
);
router.patch(
  ROUTES.PATIENT.TOGGLE,
  authenticateAdmin,
  patientController.updateStatus,
);

export default router;
