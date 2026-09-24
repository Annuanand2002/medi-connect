import { Container } from "inversify";
import { TYPES } from "../types/types";
import { AdminRepo } from "../../infrastructure/repositories/admin/auth/admin.repo.imple";
import { AdminUseCase } from "../../application/useCases/admin/adminUsecase.impl";
import { RefreshAdminUseCase } from "../../application/useCases/admin/refreshAdminUsecase.impl";
import { LogoutUseCase } from "../../application/useCases/admin/LogoutUsecase.imple";
import { AdminController } from "../../interface/controllers/admin.controller";


export function adminBinding (container : Container){
    container.bind(TYPES.AdminRepo).to(AdminRepo)
    container.bind(TYPES.AdminUseCase).to(AdminUseCase)
    container.bind(TYPES.RefreshAdminUseCase).to(RefreshAdminUseCase)
    container.bind(TYPES.LogoutUseCase).to(LogoutUseCase)
    container.bind(TYPES.AdminController).to(AdminController)
    
}