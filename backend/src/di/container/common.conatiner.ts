import { Container } from "inversify";
import { TYPES } from "../types/types";
import EmailService from "../../infrastructure/services/emailService";
import { HashService } from "../../infrastructure/services/hashService.repo.imple";
import { JWTService } from "../../infrastructure/services/ITokenService.impl";
import CounterRepo from "../../infrastructure/repositories/common";
import { S3FileUploadService } from "../../infrastructure/services/S3FileUplaod";
import { S3FileAccessService } from "../../infrastructure/services/S3FileAccesssService";
import { GetSignedFileUrlUseCase } from "../../application/useCases/service/GetFileUrl.usecase";
import { GetFileURlController } from "../../interface/controllers/service/getFileUrl.controller";

export function registerCommonBindings(container: Container): void {
  container.bind(TYPES.S3FileUploadService).to(S3FileUploadService).inSingletonScope()
  container.bind(TYPES.S3FileAccessService).to(S3FileAccessService).inSingletonScope()
  container.bind(TYPES.GetSignedFileUrlUseCase).to(GetSignedFileUrlUseCase).inSingletonScope()
  container.bind(TYPES.GetFileURlController).to(GetFileURlController).inSingletonScope()
  container.bind(TYPES.EmailService).to(EmailService).inSingletonScope();
  container.bind(TYPES.HashService).to(HashService).inSingletonScope();
  container.bind(TYPES.JWTService).to(JWTService).inSingletonScope();
  container.bind(TYPES.CounterRepo).to(CounterRepo).inSingletonScope();
}
