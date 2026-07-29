import { AdminUseCase } from "../../application/useCases/admin/adminUsecase.impl";
import { LogoutUseCase } from "../../application/useCases/admin/LogoutUsecase.imple";
import { RefreshAdminUseCase } from "../../application/useCases/admin/refreshAdminUsecase.impl";
import { AdminRepo } from "../../infrastructure/repositories/admin/auth/admin.repo.imple";
import { HashService } from "../../infrastructure/services/hashService.repo.imple";
import { JWTService } from "../../infrastructure/services/ITokenService.impl";
import { authenticate } from "../../shared/middlewares/authenticate";
import { AdminController } from "../controllers/admin/adminAuth.controller";

const adminRepository = new AdminRepo();
const hashService = new HashService();
const tokenService = new JWTService();
export const authenticateAdmin = authenticate(tokenService, "admin");
const adminUseCase = new AdminUseCase(
  adminRepository,
  hashService,
  tokenService,
);
const refershTokenUseCase = new RefreshAdminUseCase(
  adminRepository,
  tokenService,
  hashService,
);
const logoutUseCase = new LogoutUseCase(adminRepository, tokenService);
export const adminController = new AdminController(
  adminUseCase,
  refershTokenUseCase,
  logoutUseCase,
);

export const adminAuthenticate = authenticate(tokenService, "admin");
