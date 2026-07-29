import { IDcotorRequestUseCase } from "../../../application/repository/doctor/IApplyDoctorRequestUsecase";
import { Request, Response } from "express";
import asyncHandler from "../../../shared/utils/asyncHandler";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { IGetAllDoctorRequedstUseCase } from "../../../application/repository/doctor/IGetAllDoctorRequets";
import { DoctorRequestStatus } from "../../../shared/constants/doctorRequestStatus";
import { IGetDoctorRequestUseCase } from "../../../application/repository/doctor/IGetDoctorRequest.usecase";

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

export class DoctorRequestController {
  constructor(
    private readonly applyDoctorRequestUseCase: IDcotorRequestUseCase,
    private readonly getAllDoctorRequestUseCase: IGetAllDoctorRequedstUseCase,
    private readonly getDoctorRequestUseCase: IGetDoctorRequestUseCase,
  ) {}

  applyDoctorRequest = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.files) {
        throw new AppError("Files are requires", HTTP_STATUS.BAD_REQUEST);
      }
      const files = req.files as unknown as DoctorRequestFiles;

      const result = await this.applyDoctorRequestUseCase.execute({
        fullName: req.body.fullName,
        email: req.body.email,
        dateOfBirth: new Date(req.body.dateOfBirth),

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
      });

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message:
          "Application submitted successfully.Your application will be reviewed within 2-3 business days.After verification a mail will be send to your email.",
        result,
      });
    },
  );
  getAllDoctorRequest = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as DoctorRequestStatus | undefined;
    const search = req.query.search as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this.getAllDoctorRequestUseCase.execute({
      page,
      limit,
      status,
      search,
    });
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, messgae: "All requests fetched", result });
  });
  getDoctorReq = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this.getDoctorRequestUseCase.execute(id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "DoctorRequest fetched succesfully",
      result,
    });
  });
}
