import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatusCode";
import PatientModel from "../../infrastructure/database/models/patient.model";

export const checkPatientBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const patientId = req.user?.id;

    if (!patientId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const patient = await PatientModel.findById(patientId).select("status");

    if (!patient) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (patient.isBlocked === "BLOCKED") {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message:
          "Your account has been blocked. Please contact customer care.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};