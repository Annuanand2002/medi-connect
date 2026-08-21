import { VerifyDoctorSetupTokenDTO, VerifyDoctorSetupTokenResponseDTO } from "../../../../application/DTO/doctor/verifyDoctorSetupTokenF.DTO";



export interface IVerifyDoctorSetupTokenUseCase{
    execute(dto:VerifyDoctorSetupTokenDTO):Promise<VerifyDoctorSetupTokenResponseDTO>
}