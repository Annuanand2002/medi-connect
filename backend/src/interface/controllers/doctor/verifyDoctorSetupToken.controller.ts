import { IVerifyDoctorSetupTokenUseCase } from "../../../application/useCases/doctor/auth/IVerifyDoctorSetupTokenUseCase";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import asyncHandler from "../../../shared/utils/asyncHandler";
import { Request,Response } from "express";

export class VerifyDoctorSetupTokenController{
    constructor(private verifyDoctorUsecse :IVerifyDoctorSetupTokenUseCase){}
    handle = asyncHandler(async(req:Request,res:Response)=>{
        const {token} = req.query;
        const doctor = await this.verifyDoctorUsecse.execute({token : token as string})
        res.status(HTTP_STATUS.OK).json({success:true,doctor})
    })
}