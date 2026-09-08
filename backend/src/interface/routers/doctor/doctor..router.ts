import { Router } from "express";
import upload from "../../../shared/config/multer";
import { DoctorRequestController } from "../../controllers/doctor/doctor.req.controller";
import { TYPES } from "../../../di/types/types";
import { SetDoctorPasswordController } from "../../controllers/doctor/setDoctorPassword.controller";
import { RetryDoctorRequestController } from "../../controllers/doctor/retryDoctorRequest.controller";
import container from "../../../di/container/container";
import { AuthDoctorController } from "../../controllers/doctor/authDoctor.controller";
import { DoctorRefreshTokenController } from "../../controllers/doctor/doctorRefrshToken.controller";
import { ResetDoctorPasswordController } from "../../controllers/doctor/resetPassword.controller";
import { DoctorAvailController } from "../../controllers/doctor/doctorAvailability.controller";
import { ROUTES } from "../../../shared/constants/routes";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ITokenService } from "../../../domain/services/ITokenService";
import { DoctorLeaveController } from "../../controllers/doctor/doctorLeave.controller";
import { checkDoctorBlocked } from "../../../shared/middlewares/doctorBlock";
import { DoctorBlockController } from "../../controllers/doctor/doctorBlock.controller";
import { DoctorAppointmentCOntroller } from "../../controllers/doctor/appointment.doctor.controlller";

const router = Router();

const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);
const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticateDoctor = authenticate(tokenService, "doctor");
const setPasswordController = container.get<SetDoctorPasswordController>(
  TYPES.SetDoctorPasswordController,
);

const retryDoctorRequestController =
  container.get<RetryDoctorRequestController>(
    TYPES.RetryDoctorRequestController,
  );
const authDoctorController = container.get<AuthDoctorController>(
  TYPES.AuthDoctorController,
);
const refreshTokenDoctorController =
  container.get<DoctorRefreshTokenController>(
    TYPES.DoctorRefreshTokenController,
  );

const resetDoctorPasswordController =
  container.get<ResetDoctorPasswordController>(
    TYPES.ResetDoctorPasswordController,
  );
const doctorAvailabilityController = container.get<DoctorAvailController>(
  TYPES.DoctorAvailController,
);
const doctorLeaveController = container.get<DoctorLeaveController>(
  TYPES.DoctorLeaveController,
);

const doctorBlockController = container.get<DoctorBlockController>(
  TYPES.DoctorBlockController,
);

const appointmentController = container.get<DoctorAppointmentCOntroller>(
  TYPES.DoctorAppointmentCOntroller,
);

//account set-up
router.post(
  "/apply",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
    { name: "degreeCertificates", maxCount: 10 },
  ]),
  doctorRequestController.applyDoctorRequest,
);
router.post("/setup-password", setPasswordController.handle);
router.get("/retry", retryDoctorRequestController.getRetry);
router.post(
  "/retry",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "governmentId", maxCount: 1 },
    { name: "medicalLicense", maxCount: 1 },
    { name: "degreeCertificates", maxCount: 10 },
  ]),
  retryDoctorRequestController.handle,
);
//authentication
router.post("/login", authDoctorController.login);
router.post("/refresh-token", refreshTokenDoctorController.refreshToken);
router.post("/logout", authDoctorController.logout);
router.patch(
  "/request-resetpassword",
  resetDoctorPasswordController.requestReset,
);
router.patch("/reset-password", resetDoctorPasswordController.resetPassword);

router.use(authenticateDoctor, checkDoctorBlocked);
//availability
router.post(ROUTES.DOCTOR.CREATE, doctorAvailabilityController.create);

router.post(ROUTES.DOCTOR.UPDATE, doctorAvailabilityController.update);

router.patch(ROUTES.DOCTOR.UPDATE, doctorAvailabilityController.delete);
router.get(ROUTES.DOCTOR.GET, doctorAvailabilityController.getAvailability);

//leave
router.get(ROUTES.DOCTOR.GETLEAVE, doctorLeaveController.getAll);
router.post(ROUTES.DOCTOR.CREATELEAVE, doctorLeaveController.create);
router.put(ROUTES.DOCTOR.UPDATELEAVE, doctorLeaveController.update);
router.patch(ROUTES.DOCTOR.UPDATELEAVE, doctorLeaveController.delete);

//block

router.get(ROUTES.DOCTOR.BLOCK.GET, doctorBlockController.getAll);
router.post(ROUTES.DOCTOR.BLOCK.CREATE, doctorBlockController.create);
router.put(ROUTES.DOCTOR.BLOCK.UPDATE, doctorBlockController.update);
router.patch(ROUTES.DOCTOR.BLOCK.UPDATE, doctorBlockController.delete);

//appointment
router.get(ROUTES.DOCTOR.APPOINTMENT.GET, appointmentController.getAll);

export default router;
