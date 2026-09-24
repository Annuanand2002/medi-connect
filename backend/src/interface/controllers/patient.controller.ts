import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "../../di/types/types";
import { IGetAllPatientsUSeCase } from "../../domain/repositories/patient/IGetAllpatients";
import { ITogglePatientUseCase } from "../../domain/repositories/patient/repo.usecase/ITogglePatient";
import asyncHandler from "../../shared/utils/asyncHandler";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import sendResponse from "../../shared/utils/apiResponse";
import { RESPONSE_MESSAGES } from "../../shared/constants/message";
import { PatientStatus } from "../../shared/constants/role.status";
import { IPatientLoginUseCase } from "../../domain/repositories/patient/repo.usecase/IPatientLogin";
import { ILogoutUseCase } from "../../domain/repositories/common/ILogoutUseCase";
import AppError from "../../shared/errors/appErrors";
import {
  clearRefershTokenCookie,
  setRefershCookie,
} from "../../shared/utils/cookies";
import { IPatientRefreshUseCase } from "../../domain/repositories/patient/repo.usecase/IPatientRefreshToken";
import { ICreatePatientUseCase } from "../../domain/repositories/patient/repo.usecase/ICreatePatient.usecase";
import { IVerifyPatientOTPUsecase } from "../../domain/repositories/patient/repo.usecase/IVerifyOTP.usecase";
import { IResentOTPUseCase } from "../../domain/repositories/patient/repo.usecase/IResendOTP.usecase";
import { IResetPasswordUsecase } from "../../domain/repositories/common/IResetPassword.usecase";
import { IRequestForgetPassword } from "../../domain/repositories/common/IRequestForgetPassword.usecase";
import { ICreateReview } from "../../domain/repositories/doctor/repo.usecase/ICreateReview.usecase";
import { IUpdateReview } from "../../domain/repositories/doctor/repo.usecase/IUpdateReview.usecase";
import { IGetReviews } from "../../domain/repositories/doctor/repo.usecase/IGetReviews.usecase";
import { IDeleteReview } from "../../domain/repositories/doctor/repo.usecase/IDeleteReview.useCase";
import { CreateReviewDTO, UpdateReviewDTO } from "../../application/DTO/doctor/review.DTO";

@injectable()
export class PatientController {
  constructor(
    @inject(TYPES.GetAllPatientUseCase)
    private _patient: IGetAllPatientsUSeCase,
    @inject(TYPES.TogglePatientUsecase)
    private _patientToggle: ITogglePatientUseCase,
    @inject(TYPES.LoginPatientUseCase)
    private _patientUseCase: IPatientLoginUseCase,
    @inject(TYPES.LogoutPatientUseCase)
    private _patientUsecase: ILogoutUseCase,
    @inject(TYPES.RefreshPatientToken)
    private _refreshTokenUseCase: IPatientRefreshUseCase,
    @inject(TYPES.CreatePatientUSeCase)
    private _patientCreateUsecase: ICreatePatientUseCase,
    @inject(TYPES.VerifyPatientOTPUsecase)
    private _verifyOTP: IVerifyPatientOTPUsecase,
    @inject(TYPES.ResentOTPUsecase)
    private _rsendOTP: IResentOTPUseCase,
    @inject(TYPES.ResetPatientPassowrd)
    private _resetPassword: IResetPasswordUsecase,
    @inject(TYPES.RequestPatientForgetPasswordUseCase)
    private _requestResetUSeCase: IRequestForgetPassword,
        @inject(TYPES.CreateReview)
        private _createReview: ICreateReview,
        @inject(TYPES.UpdateReview)
        private _updateReview: IUpdateReview,
        @inject(TYPES.DeleteReview)
        private _deleteReview: IDeleteReview,

  ) {}

  getAllPatient = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string | undefined;
    const isBlocked = req.query.status as PatientStatus | undefined;
    const page = Number(req.query.page) | 1;
    const limit = Number(req.query.limit) | 10;
    const result = await this._patient.execute({
      page,
      limit,
      search,
      isBlocked,
    });
    //     logger.info(logger.info(`Get all pateint result: ${JSON.stringify(result, null, 2)}`))
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.FETCH, result));
  });

  //block & unblock
  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await this._patientToggle.execute(id);

    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.UPDATED, result));
  });

  //login
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._patientUseCase.execute(req.body);
    setRefershCookie(res, result.refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGIN_SUCCESS, result));
  });

  //logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token not found", HTTP_STATUS.UNAUTHORIZED);
    }
    await this._patientUsecase.execute({ refreshToken });
    clearRefershTokenCookie(res);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.LOGOUT_SUCCESS));
  });

  //refreshToken
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Token reqired", HTTP_STATUS.UNAUTHORIZED);
    }
    const result = await this._refreshTokenUseCase.execute({ refreshToken });
    setRefershCookie(res, refreshToken);
    const { refreshToken: _, ...response } = result;
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Token refreshed succesfully",
      result: response,
    });
  });

  //mail
  createPatient = asyncHandler(async (req: Request, res: Response) => {
    const patient = await this._patientCreateUsecase.execute(req.body);
    const result = {
      patientId: patient.patientId,
      email: patient.email,
    };
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse("A otp has been send to your email", result));
  });

  //sendOTP
  verifyOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    const { otp } = req.body;
    await this._verifyOTP.execute({ patientId, otp });
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse(RESPONSE_MESSAGES.EMAIL_VERIFIED));
  });

  //resendOTP
  resendOTP = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.patientId as string;
    await this._rsendOTP.execute(patientId);
    res
      .status(HTTP_STATUS.OK)
      .json(sendResponse("OTP has been been resende to your email."));
  });

  //request-apssword
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
  //resetPassowrd
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { password, token } = req.body;
    await this._resetPassword.execute({ password, token });
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.UPDATED));
  });
  //reviews
  
  //reviews
//create
  createReview = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const dto: CreateReviewDTO = {
      patientId: req.user.id,
      doctorId: req.params.doctorId as string,
      appointmentId: req.params.appointmentId as string,
      review: req.body.review,
      rating: req.body.rating,
    };

    const result = await this._createReview.execute(dto);
    res.status(HTTP_STATUS.CREATED).json(sendResponse(RESPONSE_MESSAGES.CREATED,result))
  });

  //update
  updateReview = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id as string
    const dto :UpdateReviewDTO = {
        review : req.body.reveiw,
        rating : req.body.rating
    }
    const result = await this._updateReview.execute(id,dto);
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.UPDATED,result))
  })
  //delete 
  deleteReview = asyncHandler(async(req:Request,res:Response)=>{
    const id = req.params.id as string;
    const result = await this._deleteReview.execute(id)
    res.status(HTTP_STATUS.OK).json(sendResponse(RESPONSE_MESSAGES.DELETED,result))
  })
}
