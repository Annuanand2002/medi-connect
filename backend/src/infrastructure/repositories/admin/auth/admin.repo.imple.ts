import Admin from "../../../../domain/entities/admin/admin.entity";
import { IAdminRepo } from "../../../../domain/repositories/admin/IAdmin.repo";
import AdminModel from "../../../database/models/admin.model";

export class AdminRepo implements IAdminRepo {
  async findById(id: string): Promise<Admin | null> {
    return await AdminModel.findById(id)
  }
  async findByEmail(email: string): Promise<Admin | null> {
    return await AdminModel.findOne({email})
  }
  async updateRefreshToken(
    adminId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await AdminModel.findByIdAndUpdate(adminId, { refreshToken });
  }
}
