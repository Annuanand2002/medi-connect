import { CreateDepeartmentUseCase } from "../../application/useCases/department/CreateDepartment.usecase.imp";
import { DeleteDepartmentUseCase } from "../../application/useCases/department/DeleteDepartment.usecase.imp";
import GetDepartmentUsecase from "../../application/useCases/department/GetDepartment.usecase.impl";
import { RestoreDepaertment } from "../../application/useCases/department/RestoreDepartmentUsecase";
import { UpdateDepartmentUseCase } from "../../application/useCases/department/UpdateDepartment.usecase.imp";
import { DepartmentRepo } from "../../infrastructure/repositories/department/departmentRepo.imp";
import { DepartmentController } from "../controllers/department/department.controller";

const departmentRepo = new DepartmentRepo();
const createDepartmentUseCase = new CreateDepeartmentUseCase(departmentRepo);
const getDepartmentUSeCase = new GetDepartmentUsecase(departmentRepo);
const updateDepartmentUseCase = new UpdateDepartmentUseCase(departmentRepo);
const deleteDepartmentUsecase = new DeleteDepartmentUseCase(departmentRepo);
const restoreDepartmentUseCase = new RestoreDepaertment(departmentRepo);
export const departmentController = new DepartmentController(
  createDepartmentUseCase,
  getDepartmentUSeCase,
  updateDepartmentUseCase,
  deleteDepartmentUsecase,
  restoreDepartmentUseCase,
);
