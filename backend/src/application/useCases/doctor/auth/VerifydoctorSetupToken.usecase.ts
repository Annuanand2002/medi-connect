import { injectable ,inject} from "inversify";
import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import IDoctorVerificationTokenRepo from "../../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { VerifyDoctorSetupTokenDTO, VerifyDoctorSetupTokenResponseDTO } from "../../../DTO/doctor/verifyDoctorSetupTokenF.DTO";
import { TYPES } from "../../../../di/types/types";
import { IVerifyDoctorSetupTokenUseCase } from "../../../../domain/repositories/doctor/repo.usecase/IVerifyDoctorSetupTokenUseCase";

@injectable()
export class VerifyDoctorSetupTokenUseCase implements IVerifyDoctorSetupTokenUseCase{
 constructor(
   @inject(TYPES.DoctorRepo)
   private _doctorrepo:IDoctorRepo,
   @inject(TYPES.DoctorVerificationTokenRepository)
   private  _verifyTokenRepo :IDoctorVerificationTokenRepo
 ){}
 async execute(dto: VerifyDoctorSetupTokenDTO): Promise<VerifyDoctorSetupTokenResponseDTO> {
     const verificationToken = await this._verifyTokenRepo.findByToken(dto.token);
     if(!verificationToken){
        throw new AppError("Invalid verification token",HTTP_STATUS.UNAUTHORIZED);
     }
     if(verificationToken.expiresAt<new Date()){
        await this._verifyTokenRepo.deleteByToken(dto.token)
        throw new AppError("verification link has expired",HTTP_STATUS.BAD_REQUEST)
     }
     const doctor = await this._doctorrepo.findById(verificationToken.doctorId)
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