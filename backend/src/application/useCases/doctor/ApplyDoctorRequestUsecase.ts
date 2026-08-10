import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { ApplyDoctorRequestDTO } from "../../DTO/doctorRequet/applyDoctorRequestDTO";
import { IDoctorRequestFileService } from "../../services/IDoctorRequestFileService";
import { IDcotorRequestUseCase } from "../../repository/doctor/IApplyDoctorRequestUsecase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../di/types/types";

@injectable()
export class DoctorRequestUsecase implements IDcotorRequestUseCase {
  constructor(
    @inject(TYPES.DoctorRepo)
    private _doctorRepo: IDoctorRepo,
    @inject(TYPES.DoctorRequestRepository)
    private _doctorRequestRepo: IDoctorRequest,
    @inject(TYPES.DoctorRequestFileService)
    private _doctorRequestFileService: IDoctorRequestFileService,
  ) {}

  async execute(request: ApplyDoctorRequestDTO): Promise<DoctorRequest> {
    const existingDoctor = await this._doctorRepo.findByEmail(request.email);
    if (existingDoctor) {
      throw new AppError("Doctor already registered", HTTP_STATUS.CONFLICT);
    }
    const existingReq = await this._doctorRequestRepo.findByEmail(
      request.email,
    );
    if (existingReq?.status === "PENDING") {
      throw new AppError(
        "Your application is already under review",
        HTTP_STATUS.CONFLICT,
      );
    }
    if (existingReq?.status === "APPROVED") {
      throw new AppError(
        "Your application has already been approved",
        HTTP_STATUS.CONFLICT,
      );
    }
    const { profileImg, governmentId, medicalLicense, degreeCertificates } =
      await this._doctorRequestFileService.uploadFiles(request);
    if (existingReq) {
      const updated = await this._doctorRequestRepo.update(existingReq.id!, {
        fullName: request.fullName,
        email: request.email,
        dateOfBirth: request.dateOfBirth,
        qualification: request.qualification,
        specialization: request.specialization,
        experience: request.experience,
        profileImg,
        governmentId,
        medicalLicense,
        degreeCertificates,
        status: "PENDING",
        rejectReason: undefined,
      });
      if (!updated) {
        throw new AppError(
          "Failed to update the application",
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
        );
      }
      return updated;
    }
    return await this._doctorRequestRepo.create({
      fullName: request.fullName,
      email: request.email,
      dateOfBirth: request.dateOfBirth,
      qualification: request.qualification,
      specialization: request.specialization,
      experience: request.experience,
      profileImg,
      governmentId,
      medicalLicense,
      degreeCertificates,
      status: "PENDING",
      rejectReason: undefined,
      rejectCount: 0,
    });
  }
}
