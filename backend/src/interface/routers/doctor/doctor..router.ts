import { Router } from "express";
import upload from "../../../shared/config/multer";
import { DoctorRequestController } from "../../controllers/doctor/doctor.req.controller";
import { TYPES } from "../../../di/types/types";
import { SetDoctorPasswordController } from "../../controllers/doctor/setDoctorPassword.controller";
import { GetRetryDoctorRequestController } from "../../controllers/doctor/getRetryDoctorRequest.controller";
import { RetryDoctorRequestController } from "../../controllers/doctor/retryDoctorRequest.controller";
import container from "../../../di/container/container";
import { LoginDoctorController } from "../../controllers/doctor/loginDoctor.controller";
import { DoctorRefreshTokenController } from "../../controllers/doctor/doctorRefrshToken.controller";
import { DoctorLogoutController } from "../../controllers/doctor/doctorLogout.controller";
import { RequestResetPasswordController } from "../../controllers/doctor/requestResetPassword.controller";
import { ResetDoctorPasswordController } from "../../controllers/doctor/resetPassword.controller";
import { DoctorAvailController } from "../../controllers/doctor/doctorAvailability.controller";
import { ROUTES } from "../../../shared/constants/routes";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { ITokenService } from "../../../domain/services/ITokenService";
import { DoctorLeaveController } from "../../controllers/doctor/doctorLeave.controller";
import { checkDoctorBlocked } from "../../../shared/middlewares/doctorBlock";
import { DoctorBlockController } from "../../controllers/doctor/doctorBlock.controller";

const router = Router();

const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);
const tokenService = container.get<ITokenService>(TYPES.JWTService);
const authenticateDoctor = authenticate(tokenService, "doctor");
const setPasswordController = container.get<SetDoctorPasswordController>(
  TYPES.SetDoctorPasswordController,
);
const getDoctorRetryRequestController =
  container.get<GetRetryDoctorRequestController>(
    TYPES.GetRetryDoctorRequestController,
  );
const retryDoctorRequestController =
  container.get<RetryDoctorRequestController>(
    TYPES.RetryDoctorRequestController,
  );
const loginDoctorController = container.get<LoginDoctorController>(
  TYPES.LoginDoctorController,
);
const refreshTokenDoctorController =
  container.get<DoctorRefreshTokenController>(
    TYPES.DoctorRefreshTokenController,
  );
const logoutDoctorController = container.get<DoctorLogoutController>(
  TYPES.DoctorLogoutController,
);
const requestResetPasswordController =
  container.get<RequestResetPasswordController>(
    TYPES.RequestResetPasswordController,
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
router.get("/retry", getDoctorRetryRequestController.handle);
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
router.post("/login", loginDoctorController.login);
router.post("/refresh-token", refreshTokenDoctorController.refreshToken);
router.post("/logout", logoutDoctorController.logout);
router.patch(
  "/request-resetpassword",
  requestResetPasswordController.requestReset,
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

export default router;
