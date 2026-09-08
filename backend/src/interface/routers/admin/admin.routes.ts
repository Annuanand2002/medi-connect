import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { AdminController } from "../../controllers/admin/adminAuth.controller";
import { DoctorRequestController } from "../../controllers/doctor/doctor.req.controller";
import { VerifyDoctorSetupTokenController } from "../../controllers/doctor/verifyDoctorSetupToken.controller";
import { ITokenService } from "../../../domain/services/ITokenService";
import { GetFileURlController } from "../../controllers/service/getFileUrl.controller";
import { ROUTES } from "../../../shared/constants/routes";
import { DoctorController } from "../../controllers/admin/doctors.controller";
import { PatientController } from "../../controllers/admin/patient.controller";
import ActionDoctorRequestController from "../../controllers/admin/actionDoctorReq.controller";

const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticateAdmin = authenticate(tokenService, "admin");
const adminController = container.get<AdminController>(TYPES.AdminController);
const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);
const actionDoctorReqController = container.get<ActionDoctorRequestController>(
  TYPES.ActionDoctorRequestController,
);
const verificationTokenController =
  container.get<VerifyDoctorSetupTokenController>(
    TYPES.VerifyDoctorSetupTokenController,
  );
const getFileURlController = container.get<GetFileURlController>(
  TYPES.GetFileURlController,
);
const doctorController = container.get<DoctorController>(
  TYPES.DoctorController,
);
const patientController = container.get<PatientController>(
  TYPES.PatientController,
);

router.post("/login", adminController.login);
router.post("/refresh-token", adminController.refreshToken);
router.post("/logout", adminController.logout);

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
  actionDoctorReqController.approve,
);
router.get("/setup-password", verificationTokenController.handle);
router.patch(
  "/doctor-request/reject",
  authenticateAdmin,
  actionDoctorReqController.reject,
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
