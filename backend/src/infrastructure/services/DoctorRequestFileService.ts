import { inject, injectable } from "inversify";
import FileEntity from "../../domain/entities/common/file.entity";
import { IFileUploadService } from "../../domain/services/IFileUpload";
import HTTP_STATUS from "../../shared/constants/httpStatusCode";
import AppError from "../../shared/errors/appErrors";
import { ApplyDoctorRequestDTO } from "../../application/DTO/doctorRequet/applyDoctorRequestDTO";
import {
  IDoctorRequestFileService,
  UploadedDoctorRequestFiles,
} from "../../application/services/IDoctorRequestFileService";
import { TYPES } from "../../di/types/types";

@injectable()
export class DoctorRequestFileService implements IDoctorRequestFileService {
  constructor(
    @inject(TYPES.S3FileUploadService)
    private _fileUploadService: IFileUploadService,
  ) {}
  private _validatePdf(file: FileEntity): void {
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.mimetype !== "application/pdf") {
      throw new AppError(
        "Only pdf files are allowerd",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (file.buffer.length > MAX_SIZE) {
      throw new AppError(
        "PDF size must not exceed 5 MB",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
  }
  private _validateImage(file: FileEntity): void {
    const MAX_SIZE = 5 * 1024 * 1024;
    const allowedType = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedType.includes(file.mimetype)) {
      throw new AppError(
        "Profile image must be jpeg or png format",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    if (file.buffer.length > MAX_SIZE) {
      throw new AppError(
        "Profile image must not exceed 5 MB",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
  }
  async uploadFiles(
    dto: ApplyDoctorRequestDTO,
  ): Promise<UploadedDoctorRequestFiles> {
    if (dto.profileImg) {
      this._validateImage(dto.profileImg);
    }
    this._validatePdf(dto.governmentId);
    this._validatePdf(dto.medicalLicense);
    dto.degreeCertificates.forEach((file) => this._validatePdf(file));
    const [profileImg, governmentId, medicalLicense, degreeCertificates] =
      await Promise.all([
        dto.profileImg
          ? this._fileUploadService.upload(
              dto.profileImg,
              "doctor-request/profile",
            )
          : Promise.resolve(undefined),
        this._fileUploadService.upload(
          dto.governmentId,
          "doctor-request/government-id",
        ),
        this._fileUploadService.upload(
          dto.medicalLicense,
          "doctor-request/medical-license",
        ),
        this._fileUploadService.uploadMany(
          dto.degreeCertificates,
          "doctor-request/degree-certificates",
        ),
      ]);
    return {
      profileImg,
      governmentId,
      medicalLicense,
      degreeCertificates,
    };
  }
}
