import { inject, injectable } from "inversify";
import { IDoctorRepo } from "../../../../domain/repositories/doctor/IDoctor";
import { ITokenService } from "../../../../domain/services/ITokenService";
import { HashService } from "../../../../infrastructure/services/hashService.repo.imple";
import HTTP_STATUS from "../../../../shared/constants/httpStatusCode";
import AppError from "../../../../shared/errors/appErrors";
import { DoctorLoginResDTO } from "../../../DTO/doctor/loginDoctor.DTO";
import { LoginRequestDTO } from "../../../DTO/loginReq";
import { IDoctorLoginUseCase } from "../../../repository/doctor/IDoctorLogin.usecase";
import { TYPES } from "../../../../di/types/types";


@injectable()
export class DoctorLoginUseCase implements IDoctorLoginUseCase{
    constructor(
        @inject(TYPES.DoctorRepo)
        private _doctorRepo : IDoctorRepo,
        @inject(TYPES.HashService)
        private _hashService : HashService,
        @inject(TYPES.JWTService)
        private _tokenService : ITokenService
    ){}
    async execute(dto: LoginRequestDTO): Promise<DoctorLoginResDTO> {
        const doctor = await this._doctorRepo.findByEmail(dto.email)
        if(!doctor){
            throw new AppError("Invalid email or password",HTTP_STATUS.UNAUTHORIZED)
        }
        if(!doctor.password){
            throw new AppError("Password not set",HTTP_STATUS.UNAUTHORIZED)
        }
        const isPassword = await this._hashService.comparevalue(
            dto.password,
            doctor.password
        )
        if(!isPassword){
            throw new AppError("Invalid email or password",HTTP_STATUS.UNAUTHORIZED)
        }
        const tokens = await this._tokenService.generateTokens({
            id : doctor.id!,
            userType : "doctor"
        })
        const  hashedRefreshToken  = await this._hashService.hashValue(tokens.refreshToken)
        await this._doctorRepo.updateRefreshToken(doctor.id!,hashedRefreshToken)
        return {
            accessToken : tokens.accessToken,
            refreshToken : tokens.refreshToken,
            doctor : {
                id : doctor.id!,
                email : doctor.email,
                fullName : doctor.fullName,
                profileImg : doctor.profileImg.url
            }
        }
    }
}