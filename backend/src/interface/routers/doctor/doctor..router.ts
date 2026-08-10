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

const router = Router();

const doctorRequestController = container.get<DoctorRequestController>(
  TYPES.DoctorRequestController,
);
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
export default router;
