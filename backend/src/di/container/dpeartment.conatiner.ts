import { Container } from "inversify";
import { TYPES } from "../types/types";
import { DepartmentRepo } from "../../infrastructure/repositories/department/departmentRepo.imp";
import { CreateDepeartmentUseCase } from "../../application/useCases/department/CreateDepartment.usecase.imp";
import GetDepartmentUsecase from "../../application/useCases/department/GetDepartment.usecase.impl";
import { UpdateDepartmentUseCase } from "../../application/useCases/department/UpdateDepartment.usecase.imp";
import { DeleteDepartmentUseCase } from "../../application/useCases/department/DeleteDepartment.usecase.imp";
import { RestoreDepaertment } from "../../application/useCases/department/RestoreDepartmentUsecase";
import { DepartmentController } from "../../interface/controllers/department/department.controller";

export function departmentBinding(container: Container) {
  container.bind(TYPES.DepartmentRepo).to(DepartmentRepo);
  container.bind(TYPES.CreateDepeartmentUseCase).to(CreateDepeartmentUseCase);
  container.bind(TYPES.GetDepartmentUsecase).to(GetDepartmentUsecase);
  container.bind(TYPES.UpdateDepartmentUseCase).to(UpdateDepartmentUseCase);
  container.bind(TYPES.DeleteDepartmentUseCase).to(DeleteDepartmentUseCase);
  container.bind(TYPES.RestoreDepaertment).to(RestoreDepaertment);
  container.bind(TYPES.DepartmentController).to(DepartmentController);
}
