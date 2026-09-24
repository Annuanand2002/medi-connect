import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types/types";
import { IDoctorLoginUseCase } from "../../domain/repositories/doctor/repo.usecase/IDoctorLogin.usecase";
import { ILogoutUseCase } from "../../domain/repositories/common/ILogoutUseCase";
import asyncHandler from "../../shared/utils/asyncHandler";
import {
  clearRefershTokenCookie,
  setRefershCookie,
} from "../../shared/utils/cookies";
import { Request, Response } from "express";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import sendResponse from "../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../shared/constants/message";
import AppError from "../../shared/errors/appErrors";
import { IRefreshDoctorUseCase } from "../../domain/repositories/doctor/repo.usecase/IDoctorRefresh.usecase";
import { IVerifyDoctorSetupTokenUseCase } from "../../domain/repositories/doctor/repo.usecase/IVerifyDoctorSetupTokenUseCase";
import { IGetAllDoctorUseCase } from "../../domain/repositories/doctor/repo.usecase/IGetAllDoctor";
import { IToggleDoctorStatus } from "../../domain/repositories/doctor/repo.usecase/IToggleDoctorStatus";
import { DoctorStatus } from "../../shared/constants/role.status";
import { IResetPasswordUsecase } from "../../domain/repositories/common/IResetPassword.usecase";
import { IRequestForgetPassword } from "../../domain/repositories/common/IRequestForgetPassword.usecase";
import { ISetPasswordUsecase } from "../../domain/repositories/doctor/repo.usecase/ISetPasswordUsecase";
import { GetDoctorReqDTO } from "../../application/DTO/doctor/getDoctorDTO";
import { ICreateDoctorAvailUseCase } from "../../domain/repositories/doctor/repo.usecase/IDoctorAvaulabilityCreate.usecase";
import { IUpdateDoctorAvailabilityUseCase } from "../../domain/repositories/doctor/repo.usecase/IUpdateDoctorAvail.usecase";
import { IDeleteDoctorAvailUsecase } from "../../domain/repositories/doctor/repo.usecase/IDeleteDotcorAvail.usecase";
import { IGetDoctorAvailUsecase } from "../../domain/repositories/doctor/repo.usecase/IGetDoctorAvailability";
import {
  CreateDoctorAvailabilityDTO,
  UpdateDoctorAvailabilityDTO,
} from "../../application/DTO/doctor/doctorAvailbilty";
import { ICreateDoctorBlockUseCase } from "../../domain/repositories/doctor/repo.usecase/ICreateDoctorBlock";
import { IUpdateDoctorBlockUsecase } from "../../domain/repositories/doctor/repo.usecase/IUpdateDoctor.usecae";
import { IDeleteDoctorBlockUseCase } from "../../domain/repositories/doctor/repo.usecase/IDeleteDoctor.usecase";
import { IGetDoctorBlockusecase } from "../../domain/repositories/doctor/repo.usecase/IGetDotcorBlock.usecase";
import { ICreateDoctorLeaveUsecase } from "../../domain/repositories/doctor/repo.usecase/ICreateDoctorLeave.usecase";
import { IUpdateDoctorLeaveUseCase } from "../../domain/repositories/doctor/repo.usecase/IUpdateDoctorLeave";
import { IDeleteDoctorLeaveUsecase } from "../../domain/repositories/doctor/repo.usecase/IDeleteDoctorLeave.usecase";
import { IGetDoctorLeaveUseCase } from "../../domain/repositories/doctor/repo.usecase/IGetAllDoctorLeave.usecase";

@injectable()
export class DoctorController {
  constructor(
    @inject(TYPES.DoctorLoginUseCase)
    private _loginDoctorUsecase: IDoctorLoginUseCase,
    @inject(TYPES.LogoutDoctorUseCase)
    private _doctorLogoutUsecase: ILogoutUseCase,
    @inject(TYPES.RefreshDoctorUseCase)
    private _doctorRefreshUsecase: IRefreshDoctorUseCase,
    @inject(TYPES.VerifyDoctorSetupTokenUseCase)
    private _verifyDoctorUsecse: IVerifyDoctorSetupTokenUseCase,
    @inject(TYPES.GetAllDoctorsUSeCase)
    private _getAllDoctor: IGetAllDoctorUseCase,
    @inject(TYPES.ToggelDoctorStatus)
    private _toggle: IToggleDoctorStatus,
    @inject(TYPES.ResetDoctorPassowrd)
    private _resetPassword: IResetPasswordUsecase,
    @inject(TYPES.RequestDoctorForgetPasswordUseCase)
    private _requestResetUSeCase: IRequestForgetPassword,
    @inject(TYPES.SetPasswordUsecase)
    private _setPasswordUsecase: ISetPasswordUsecase,
    @inject(TYPES.GetAllDoctorsUSeCase)
    private _getDoctor: IGetAllDoctorUseCase,
    @inject(TYPES.CreateDoctorAvailUseCase)
    private _doctorAvilUseCase: ICreateDoctorAvailUseCase,
    @inject(TYPES.UpdateDoctorAvailabilityUseCase)
    private _doctorUpdateAvil: IUpdateDoctorAvailabilityUseCase,
    @inject(TYPES.DeleteDoctorAvailUsecase)
    private _doctorDelAvil: IDeleteDoctorAvailUsecase,
    @inject(TYPES.GetDoctorAvailUsecase)
    private _getDoctorAvail: IGetDoctorAvailUsecase,
    @inject(TYPES.CreateDoctorBlockUseCase)
    private _createBlock: ICreateDoctorBlockUseCase,
    @inject(TYPES.UpdateDoctorBlockUsecase)
    private _updateBlock: IUpdateDoctorBlockUsecase,
    @inject(TYPES.DeleteDoctorBlockUsecase)
    private _deletBlock: IDeleteDoctorBlockUseCase,
    @inject(TYPES.GetDoctorBlockUsecase)
    private _getBlock: IGetDoctorBlockusecase,
    @inject(TYPES.CreateDoctorLeave)
    private _createLeave: ICreateDoctorLeaveUsecase,
    @inject(TYPES.UpdateDoctorLeave)
    private _updateLeave: IUpdateDoctorLeaveUseCase,
    @inject(TYPES.DeleteDoctorLeaveusecase)
    private _deleteLeave: IDeleteDoctorLeaveUsecase,
    @inject(TYPES.GetAllDoctorLeaveUsecase)
    private _getLeave: IGetDoctorLeaveUseCase,
  ) {}

  //login
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._loginDoctorUsecase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGIN_SUCCESS, result));
  });

  //logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._doctorLogoutUsecase.execute({ refreshToken });
    clearRefershTokenCookie(res);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGOUT_SUCCESS));
  });

  //refresh
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token is required", HTTP_STATUS.UNAUTHORIZED);
    }
    const result = await this._doctorRefreshUsecase.execute({
      refreshToken,
    });
    setRefershCookie(res, result.refreshToken);
    const { refreshToken: _, ...response } = result;
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Token refreshed succesfully",
      result: response,
    });
  });

  //verify token
  verify = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    const doctor = await this._verifyDoctorUsecse.execute({
      token: token as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, doctor));
  });

  getAllDoctor = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as DoctorStatus | undefined;
    const search = req.query.search as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await this._getAllDoctor.execute({
      page,
      limit,
      search,
      status,
    });
    return res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //block and unblock
  toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._toggle.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //requestPassword
  requestReset = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await this._requestResetUSeCase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json(
        sendResponse(
          "A reset link has been send to your email.Please check your email",
        ),
      );
  });

  //resetPassword
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { password, token } = req.body;
    await this._resetPassword.execute({ password, token });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.UPDATED));
  });

  //setPassword
  setPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await this._setPasswordUsecase.execute({ token, password });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.CREATED));
  });
  //pateint -getAllDoctor
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string | undefined;
    const department = req.query.department as string | undefined;
    const status = DoctorStatus.ACTIVE;
    const dto: GetDoctorReqDTO = {
      page,
      limit,
      search,
      status,
      department,
    };
    const reuslt = await this._getDoctor.execute(dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, reuslt));
  });
  //availability

  createAvail = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const dto: CreateDoctorAvailabilityDTO = req.body;

    const availability = await this._doctorAvilUseCase.exceute(doctorId, dto);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, availability));
  });
  updateAvail = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const dto: UpdateDoctorAvailabilityDTO = req.body;
    const update = await this._doctorUpdateAvil.execute(id, doctorId, dto);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, update));
  });
  deleteAvail = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const deleted = await this._doctorDelAvil.execute(doctorId, id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, deleted));
  });
  getAvailability = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unathoirzed", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const doctors = await this._getDoctorAvail.execute(doctorId);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, doctors));
  });

  //block

  createBlock = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const data = {
      doctorId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason,
    };
    const result = await this._createBlock.execute(data);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, result));
  });

  updateBlock = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const data = {
      doctorId,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      reason: req.body.reason,
    };
    const result = await this._updateBlock.execute(id, data);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  deleteBlock = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const result = await this._deletBlock.execute(doctorId, id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, result));
  });

  getAllBlock = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const date =
      typeof req.query.date === "string" ? req.query.date : undefined;

    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : 1;

    const limit =
      typeof req.query.limit === "string" ? Number(req.query.limit) : 10;
    const result = await this._getBlock.execute({
      doctorId,
      page,
      search,
      date,
      limit,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //leave
  //create
  createLeave = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const data = {
      doctorId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    };
    const result = await this._createLeave.execute(data);
    res
      .status(HTTP_STATUS.CREATED)
      .json(sendResponse(RESPONSE_MESSAGES.CREATED, result));
  });

  //update
  updateLeave = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const doctorId = req.user.id;
    const data = {
      doctorId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    };
    const result = await this._updateLeave.execute(id, data);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //delete
  deleteLeave = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unathorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const doctorId = req.user.id;
    const id = req.params.id as string;
    const result = await this._deleteLeave.execute(doctorId, id);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.DELETED, result));
  });

  //getAll

  getAllLeave = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const doctorId = req.user.id;

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const date =
      typeof req.query.date === "string" ? req.query.date : undefined;

    const page =
      typeof req.query.page === "string" ? Number(req.query.page) : 1;

    const limit =
      typeof req.query.limit === "string" ? Number(req.query.limit) : 10;

    const result = await this._getLeave.execute({
      doctorId,
      search,
      date,
      page,
      limit,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });
}
