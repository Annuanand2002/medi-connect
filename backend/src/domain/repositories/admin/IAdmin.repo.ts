import Admin from "../../entities/admin/admin.entity";
import { IBaseRepository } from "../base/IBaseRepository";

export interface IAdminRepo extends IBaseRepository<Admin|null>{
  findByEmail(email: string): Promise<Admin | null>;
  updateRefreshToken(id: string, refreshToken: string|null): Promise<void>;
}
