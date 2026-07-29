import { Router } from "express";
import upload from "../../../shared/config/multer";
import {
  doctorRequestController,
  getDoctorRetryRequestController,
  retryDoctorRequestController,
} from "../../container/doctorRequest.container";
import { setPasswordController } from "../../container/doctor.container";

const router = Router();

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

export default router;
