import { VerifyDoctorSetupTokenDTO, VerifyDoctorSetupTokenResponseDTO } from "../../../DTO/doctor/verifyDoctorSetupTokenF.DTO";

export interface IVerifyDoctorSetupTokenUseCase{
    execute(dto:VerifyDoctorSetupTokenDTO):Promise<VerifyDoctorSetupTokenResponseDTO>
}