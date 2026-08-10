import { VerifyPatientOtpDTO } from "../../DTO/patient/verifyOTP.dto";

export interface IVerifyPatientOTPUsecase {
    execute(dto:VerifyPatientOtpDTO):Promise<void>
}