import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../../di/types/types";
import { IDcotorRequestUseCase } from "../../domain/repositories/doctor/repo.usecase/IApplyDoctorRequestUsecase";
import { IGetAllDoctorRequedstUseCase } from "../../domain/repositories/doctor/repo.usecase/IGetAllDoctorRequets";
import { IGetDoctorRequestUseCase } from "../../domain/repositories/doctor/repo.usecase/IGetDoctorRequest.usecase";
import asyncHandler from "../../shared/utils/asyncHandler";
import sendResponse from "../../shared/utils/apiResponse";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import { RESPONSE_MESSAGES } from "../../shared/constants/message";
import { DoctorRequestStatus } from "../../shared/constants/role.status";
import AppError from "../../shared/errors/appErrors";
import { IRetryDoctorRequestUseCase } from "../../domain/repositories/doctor/repo.usecase/IRetryDoctorRequest";
import { IGetDoctorRetryRequest } from "../../domain/repositories/doctor/repo.usecase/IGetDoctorRetryReq.usecase";
import { RetryDoctorRequestDTO } from "../../application/DTO/doctorRequet/retryDoctorRequest.update.DTO";
import { IApproveDoctorRequestUsecase } from "../../domain/repositories/doctor/repo.usecase/IApproveDoctorRequestUsecase";
import { IRejectDoctorRequestUseCase } from "../../domain/repositories/doctor/repo.usecase/IRejectDoctorRequest.usecase";

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
export class DoctorRequestController {
  constructor(
    @inject(TYPES.DoctorRequestUsecase)
    private readonly _applyDoctorRequestUseCase: IDcotorRequestUseCase,
    @inject(TYPES.GetAllDoctorRequestUseCase)
    private readonly _getAllDoctorRequestUseCase: IGetAllDoctorRequedstUseCase,
    @inject(TYPES.GetDoctorRequestUseCase)
    private readonly _getDoctorRequestUseCase: IGetDoctorRequestUseCase,
    @inject(TYPES.RetryDoctorRequestUseCase)
    private _retryDoctorRequestUsecase: IRetryDoctorRequestUseCase,
    @inject(TYPES.GetDoctorRetryRequest)
    private _getRetryDoctorRequest: IGetDoctorRetryRequest,
    @inject(TYPES.ApproveDoctorRequestUsecase)
    private _approveDoctorRequestUsecase: IApproveDoctorRequestUsecase,
    @inject(TYPES.RejectdoctorRequestUseCase)
    private _rejectReqesUseCase: IRejectDoctorRequestUseCase,
  ) {}

  //create req
  applyDoctorRequest = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.files) {
        throw new AppError("Files are requires", HTTP_STATUS.BAD_REQUEST);
      }
      const files = req.files as unknown as DoctorRequestFiles;

      await this._applyDoctorRequestUseCase.execute({
        fullName: req.body.fullName,
        email: req.body.email,
        dateOfBirth: new Date(req.body.dateOfBirth),
        qualification: req.body.qualification,
        department: req.body.department,
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

      res
        .status(HTTP_STATUS.CREATED)
        .json(
          sendResponse(
            "your application submitted succesfylly.It will be reviwed within 2-3 bussiness days and connect with you through your email.",
          ),
        );
    },
  );
  //getAll request
  getAllDoctorRequest = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as DoctorRequestStatus | undefined;
    const search = req.query.search as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this._getAllDoctorRequestUseCase.execute({
      page,
      limit,
      status,
      search,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
  //getOnereq
  getDoctorReq = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    console.log("token id", id);
    const result = await this._getDoctorRequestUseCase.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //retry
  handle = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as unknown as DoctorRequestFiles;
    const dto: RetryDoctorRequestDTO = {
      token: req.body.token,
      fullName: req.body.fullName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      qualification: req.body.qualification,
      department: req.body.department,
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
    const result = await this._retryDoctorRequestUsecase.execute(dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //getRetryReq
  getRetry = asyncHandler(async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const result = await this._getRetryDoctorRequest.execute(token);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

    //aprove
  approve = asyncHandler(async (req: Request, res: Response) => {
    const { doctorRequestId} = req.body;
    await this._approveDoctorRequestUsecase.execeute({
      doctorRequestId,
    });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.CREATED));
  });

  //reject
  reject = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const { rejectReason } = req.body;
    await this._rejectReqesUseCase.execute({
      doctorRequestId: id,
      rejectReason,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.REJECT));
  });
}
