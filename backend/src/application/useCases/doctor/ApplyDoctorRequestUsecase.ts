import DoctorRequest from "../../../domain/entities/doctor/doctorRequestEntity";
import { IDoctorRepo } from "../../../domain/repositories/doctor/IDoctor";
import { IDoctorRequest } from "../../../domain/repositories/doctor/IDoctorRequest";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import AppError from "../../../shared/errors/appErrors";
import { ApplyDoctorRequestDTO } from "../../DTO/doctorRequet/applyDoctorRequestDTO";
import { IDoctorRequestFileService } from "../../services/IDoctorRequestFileService";
import { IDcotorRequestUseCase } from "./IApplyDoctorRequestUsecase";

export class DoctorRequestUsecase implements IDcotorRequestUseCase {
  constructor(
    private doctorRepo: IDoctorRepo,
    private doctorRequestRepo: IDoctorRequest,
    private doctorRequestFileService: IDoctorRequestFileService,
  ) {}

  async execute(request: ApplyDoctorRequestDTO): Promise<DoctorRequest> {
    const existingDoctor = await this.doctorRepo.findByEmail(request.email);
    if (existingDoctor) {
      throw new AppError("Doctor already registered", HTTP_STATUS.CONFLICT);
    }
    const existingReq = await this.doctorRequestRepo.findByEmail(request.email);
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
      await this.doctorRequestFileService.uploadFiles(request);
    if (existingReq) {
      const updated = await this.doctorRequestRepo.update(existingReq.id!, {
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
    return await this.doctorRequestRepo.create({
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
