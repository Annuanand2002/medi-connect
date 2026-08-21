import { VerifyPatientOtpDTO } from "../../../../application/DTO/patient/verifyOTP.dto";


export interface IVerifyPatientOTPUsecase {
    execute(dto:VerifyPatientOtpDTO):Promise<void>
}