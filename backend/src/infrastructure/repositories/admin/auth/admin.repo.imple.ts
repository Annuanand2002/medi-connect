import { injectable } from "inversify";
import Admin from "../../../../domain/entities/admin/admin.entity";
import { IAdminRepo } from "../../../../domain/repositories/admin/IAdmin.repo";
import AdminModel, { AdminSchmea } from "../../../database/models/admin.model";
import { BaseRepository } from "../../Base/base.repo.impl";
import { AmdinMapper } from "../../../mappers/AdminMapper";



@injectable()
export class AdminRepo
  extends BaseRepository<AdminSchmea, Admin>
  implements IAdminRepo
{
  constructor() {
    super(AdminModel, AmdinMapper.toDomain, AmdinMapper.toPersistence);
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const document = await AdminModel.findOne({ email });
    if (!document) {
      return null;
    }
    return AmdinMapper.toDomain(document);
  }
  async updateRefreshToken(
    adminId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await AdminModel.findByIdAndUpdate(adminId, { refreshToken });
  }
}
