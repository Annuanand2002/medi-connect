import { inject, injectable } from "inversify";
import { RetryDoctorRequestDTO } from "../../../application/DTO/doctorRequet/retryDoctorRequest.update.DTO";
import { IRetryDoctorRequestUseCase } from "../../../application/repository/doctor/IRetryDoctorRequest";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request, Response } from "express";
import { TYPES } from "../../../di/types/types";

type DoctorRequestFiles = {
  profileImg?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }[];
  governmentId: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }[];
  medicalLicense: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }[];
  degreeCertificates: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  }[];
};

@injectable()
export class RetryDoctorRequestController {
  constructor(
    @inject(TYPES.RetryDoctorRequestUseCase)
    private _retryDoctorRequestUsecase: IRetryDoctorRequestUseCase,
  ) {}
  handle = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as unknown as DoctorRequestFiles;
    const dto: RetryDoctorRequestDTO = {
      token: req.body.token,
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      qualification: req.body.qualification,
      specialization: req.body.specialization,
      experience: Number(req.body.experience),
      profileImg: files.profileImg?.[0]
        ? {
            buffer: files.profileImg[0].buffer,
            mimetype: files.profileImg[0].mimetype,
            originalName: files.profileImg[0].originalname,
          }
        : undefined,

      governmentId: {
        buffer: files.governmentId[0].buffer,
        mimetype: files.governmentId[0].mimetype,
        originalName: files.governmentId[0].originalname,
      },

      medicalLicense: {
        buffer: files.medicalLicense[0].buffer,
        mimetype: files.medicalLicense[0].mimetype,
        originalName: files.medicalLicense[0].originalname,
      },

      degreeCertificates: files.degreeCertificates.map((file) => ({
        buffer: file.buffer,
        mimetype: file.mimetype,
        originalName: file.originalname,
      })),
    };
    const doctorRequest = await this._retryDoctorRequestUsecase.execute(dto);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message:
        "request updated succesfully.We will review it within 2-3 business days.Please check your mail.",
      result: doctorRequest,
    });
  });
}
