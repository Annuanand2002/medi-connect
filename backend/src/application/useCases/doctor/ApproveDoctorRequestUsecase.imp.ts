import { randomUUID } from "node:crypto";
import { IDepartmentRepo } from "../../../domain/repositories/department/IDepeartmentRepo";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { ApproveDoctorRewuestDTO } from "../../DTO/doctorRequet/approveDoctorRequestSTO";
import { IApproveDoctorRequestUsecase } from "../../repository/doctor/IApproveDoctorRequestUsecase";
import IDoctorVerificationTokenRepo from "../../../domain/repositories/doctor/IDoctorVerificationTokenRepo";
import IEmailService from "../../services/IEmailService";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../di/types/types";
import { ICounterRepo } from "../../../domain/repositories/common/ICounter";
import { generateCode } from "../../../shared/utils/GenerateCode";

@injectable()
export class ApproveDoctorRequestUsecase implements IApproveDoctorRequestUsecase {
  constructor(
    @inject(TYPES.DoctorRequestRepository)
    private _doctorReqRepo: IDoctorRequest,
    @inject(TYPES.DepartmentRepo)
    private _departmentRepo: IDepartmentRepo,
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.DoctorVerificationTokenRepository)
    private _verificationTokenRepo: IDoctorVerificationTokenRepo,
    @inject(TYPES.EmailService)
    private _emailService: IEmailService,
    @inject(TYPES.CounterRepo)
    private _counterRepo : ICounterRepo
  ) {}
  
  async execeute(request: ApproveDoctorRewuestDTO): Promise<void> {
    const requests = await this._doctorReqRepo.findById(
      request.doctorRequestId,
    );
    if (!requests) {
      throw new AppError("Doctor request not found", HTTP_STATUS.NOT_FOUND);
    }
    if (requests.status !== "PENDING") {
      throw new AppError(
        "Doctor request has already been processed",
        HTTP_STATUS.CONFLICT,
      );
    }
    const department = await this._departmentRepo.findById(
      request.departmentId,
    );
    if (!department || !department.isActive) {
      throw new AppError("department not found", HTTP_STATUS.NOT_FOUND);
    }
    const existingDoctor = await this._doctorRepo.findByEmail(requests.email);
    if (existingDoctor) {
      throw new AppError("doctor already exits", HTTP_STATUS.CONFLICT);
    }
    const sequence = await this._counterRepo.getNextSequence("doctor")
    const doctorCode = await generateCode(sequence,"DOC")
    const doctor = await this._doctorRepo.create({
      doctorCode,
      fullName: requests.fullName,
      email: requests.email,
      qualification: requests.qualification,
      specialization: requests.specialization,
      experience: requests.experience,
      profileImg: requests.profileImg,
      departmentId: request.departmentId,
      status: "PENDING_SETUP",
    });
    const verificationToken = randomUUID();
    await this._verificationTokenRepo.deleteByDoctorId(doctor.id!);
    await this._verificationTokenRepo.create({
      doctorId: doctor.id!,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await this._emailService.sendDoctorSetupEmail({
      name: doctor.fullName,
      email: doctor.email,
      token: verificationToken,
    });
    await this._doctorReqRepo.update(request.doctorRequestId, {
      status: "APPROVED",
    });
  }
}
