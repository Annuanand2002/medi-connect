import { inject, injectable } from "inversify";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request,Response } from "express";
import { TYPES } from "../../../di/types/types";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { ICreatePatientUseCase } from "../../../domain/repositories/patient/repo.usecase/ICreatePatient.usecase";

@injectable()
export class CreatePatientController{
    constructor(
        @inject(TYPES.CreatePatientUSeCase)
        private _patientUsecase :ICreatePatientUseCase
    ){}
    createPatient = asyncHandler(async(req:Request,res:Response)=>{
       const patient = await this._patientUsecase.execute(req.body)
       res.status(HTTP_STATUS.OK).json({success:true,message:"An otp has been send to your email.",result : {
        patientId:patient.patientId,
        email:patient.email
       }})
    })
}