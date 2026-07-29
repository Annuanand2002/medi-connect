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

export class ApproveDoctorRequestUsecase implements IApproveDoctorRequestUsecase {
  constructor(
    private doctorReqRepo: IDoctorRequest,
    private departmentRepo: IDepartmentRepo,
    private doctorRepo: IDoctorRepo,
    private verificationTokenRepo: IDoctorVerificationTokenRepo,
    private emailService: IEmailService,
  ) {}
  private async generateDoctorCode(): Promise<string> {
    const lastDoctor = await this.doctorRepo.findLastdoctor();

    if (!lastDoctor?.doctorCode) {
      return "DOC001";
    }

    const lastNumber = parseInt(lastDoctor.doctorCode.replace("DOC", ""), 10);

    return `DOC${String(lastNumber + 1).padStart(3, "0")}`;
  }
  async execeute(request: ApproveDoctorRewuestDTO): Promise<void> {
    const requests = await this.doctorReqRepo.findById(request.doctorRequestId);
    if (!requests) {
      throw new AppError("Doctor request not found", HTTP_STATUS.NOT_FOUND);
    }
    if (requests.status !== "PENDING") {
      throw new AppError(
        "Doctor request has already been processed",
        HTTP_STATUS.CONFLICT,
      );
    }
    const department = await this.departmentRepo.findById(request.departmentId);
    if (!department || !department.isActive) {
      throw new AppError("department not found", HTTP_STATUS.NOT_FOUND);
    }
    const existingDoctor = await this.doctorRepo.findByEmail(requests.email);
    if (existingDoctor) {
      throw new AppError("doctor already exits", HTTP_STATUS.CONFLICT);
    }
    const doctorCode = await this.generateDoctorCode();
    const doctor = await this.doctorRepo.create({
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
    await this.verificationTokenRepo.deleteByDoctorId(doctor.id!);
    await this.verificationTokenRepo.create({
      doctorId: doctor.id!,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await this.emailService.sendDoctorSetupEmail({
      name: doctor.fullName,
      email: doctor.email,
      token: verificationToken,
    });
    await this.doctorReqRepo.update(request.doctorRequestId, {
      status: "APPROVED",
    });
  }
}
