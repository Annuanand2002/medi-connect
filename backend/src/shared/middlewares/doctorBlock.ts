import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatusCode";
import DoctorModel from "../../infrastructure/database/models/doctor.model";

export const checkDoctorBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const doctorId = req.user?.id;

    if (!doctorId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const doctor = await DoctorModel.findById(doctorId).select(
      "status",
    );

    if (!doctor) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (doctor.status === "BLOCKED") {
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