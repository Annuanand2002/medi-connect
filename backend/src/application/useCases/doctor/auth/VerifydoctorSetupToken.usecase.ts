import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import IDoctorVerificationTokenRepo from "../../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { VerifyDoctorSetupTokenDTO, VerifyDoctorSetupTokenResponseDTO } from "../../../DTO/doctor/verifyDoctorSetupTokenF.DTO";
import { IVerifyDoctorSetupTokenUseCase } from "./IVerifyDoctorSetupTokenUseCase";

export class VerifyDoctorSetupTokenUseCase implements IVerifyDoctorSetupTokenUseCase{
 constructor(private doctorrepo:IDoctorRepo,
   private  verifyTokenRepo :IDoctorVerificationTokenRepo
 ){}
 async execute(dto: VerifyDoctorSetupTokenDTO): Promise<VerifyDoctorSetupTokenResponseDTO> {
     const verificationToken = await this.verifyTokenRepo.findByToken(dto.token);
     if(!verificationToken){
        throw new AppError("Invalid verification token",HTTP_STATUS.UNAUTHORIZED);
     }
     if(verificationToken.expiresAt<new Date()){
        await this.verifyTokenRepo.deleteByToken(dto.token)
        throw new AppError("verification link has expired",HTTP_STATUS.BAD_REQUEST)
     }
     const doctor = await this.doctorrepo.findById(verificationToken.doctorId)
     if(!doctor){
        throw new AppError("doctor not found",HTTP_STATUS.NOT_FOUND)
     }
     return {
        doctorId : doctor.id!,
        fullName :doctor.fullName,
        email : doctor.email
     }

 }
}