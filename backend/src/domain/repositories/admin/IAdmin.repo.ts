import Admin from "../../entities/admin/admin.entity";

export interface IAdminRepo{
  findById(id:string):Promise<Admin|null>
  findByEmail(email: string): Promise<Admin | null>;
  updateRefreshToken(id: string, refreshToken: string|null): Promise<void>;
}
