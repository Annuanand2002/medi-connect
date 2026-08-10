import { injectable } from "inversify";
import Admin from "../../../../domain/entities/admin/admin.entity";
import { IAdminRepo } from "../../../../domain/repositories/admin/IAdmin.repo";
import AdminModel, { AdminSchmea } from "../../../database/models/admin.model";
import { BaseRepository } from "../../Base/base.repo.impl";
import { AmdinMapper } from "../../../database/mappers/AdminMapper";

@injectable()
export class AdminRepo extends BaseRepository<AdminSchmea, Admin> implements IAdminRepo {
  constructor(){
    super(AdminModel,AmdinMapper.toDomain)
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
