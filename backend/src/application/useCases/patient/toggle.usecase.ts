import { inject, injectable } from "inversify";
import { ITogglePatientUseCase } from "../../../domain/repositories/patient/repo.usecase/ITogglePatient";
import { TYPES } from "../../../di/types/types";
import { IPatientRepo } from "../../../domain/repositories/patient/IPatient.repo";
import AppError from "../../../shared/errors/appErrors";
import HTTP_STATUS from "../../../shared/constants/httpStatusCode";
import { Patient } from "../../../domain/entities/patient/patient.entity";

@injectable()
export class TogglePatientUsecase implements ITogglePatientUseCase {
  constructor(
    @inject(TYPES.PatientRepo)
    private _patient: IPatientRepo,
  ) {}
  async execute(id: string): Promise<Patient> {
    const patient = await this._patient.findById(id);
    if (!patient) {
      throw new AppError("Patient not found", HTTP_STATUS.NOT_FOUND);
    }
    const newStatus = patient.isBlocked === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const updated = await this._patient.update(patient.id!, {
      isBlocked: newStatus,
    });
    if (!updated) {
      throw new AppError(
        "Cannot update the patient",
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
    return updated;
}
}
