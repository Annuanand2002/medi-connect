import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import { IDoctorRetryTokenRepo } from "../../../domain/repositories/doctor/IDoctorRetry.repo";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { IGetDoctorRetryRequest } from "./IGetDoctorRetryReq.usecase";


export class GetDoctorRetryRequest implements IGetDoctorRetryRequest{
    constructor(
        private doctorRequestRepo : IDoctorRequest,
        private getDoctorRetry : IDoctorRetryTokenRepo
    ){}
    async execute(token: string): Promise<DoctorRequest> {
        const retryToken = await this.getDoctorRetry.findByToken(token);
        if(!retryToken){
            throw new AppError("Invalid retryb token",HTTP_STATUS.BAD_REQUEST)
        }
        if(retryToken.expiresAt < new Date()){
            throw new AppError("Token expires",HTTP_STATUS.BAD_REQUEST)
        }
        const doctorRetryRequest = await this.doctorRequestRepo.findById(retryToken.doctorRequestId)
        if(!doctorRetryRequest){
            throw new AppError("Request not found",HTTP_STATUS.NOT_FOUND)
        }
        return doctorRetryRequest
    }
}