import { inject, injectable } from "inversify";
import { ICreatePatientUseCase } from "../../repository/patient/ICreatePatient.usecase";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import { TYPES } from "../../../di/types/types";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import {
  CreatePatienResponsetDTO,
  CreatePatientDTO,
} from "../../DTO/patient/createPatientDTO";
import { ICounterRepo } from "../../../domain/repositories/common/ICounter";
import { generateCode } from "../../../shared/utils/GenerateCode";
import { IPatientOtpRepo } from "../../../domain/repositories/patient/IPatientOtp.repo";
import IEmailService from "../../services/IEmailService";
import { generateOtp } from "../../../shared/utils/generateOTP";

@injectable()
export class CreatePatientUSeCase implements ICreatePatientUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patientRepo: IPatientRepo,
    @inject(TYPES.CounterRepo)
    private _counterRepo: ICounterRepo,
    @inject(TYPES.PatientOTPRepo)
    private _otpService: IPatientOtpRepo,
    @inject(TYPES.EmailService)
    private _emailService: IEmailService,
  ) {}
  async execute(dto: CreatePatientDTO): Promise<CreatePatienResponsetDTO> {
    const existingPatient = await this._patientRepo.findByEmail(dto.email);
    if (existingPatient) {
      throw new AppError("email already exist", HTTP_STATUS.BAD_REQUEST);
    }
    const sequence = await this._counterRepo.getNextSequence("patient");
    const patientCode = generateCode(sequence,"PAT");
    const patient = await this._patientRepo.create({
      ...dto,
      patientCode,
      isVerified: false,
    });
    const otp = generateOtp()
    await this._otpService.create({
      patientId: patient.id!,
      otp: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      lastSentAt : new Date(),
      resendCount : 0
    });
    await this._emailService.sendPatientOtp({
      name: patient.fullName,
      email: patient.email,
      otp: otp,
    });
    return {
      patientId: patient.id!,
      email: patient.email,
    };
  }
}
