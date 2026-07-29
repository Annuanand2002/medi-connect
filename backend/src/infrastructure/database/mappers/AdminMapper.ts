import Admin from "../../../domain/entities/admin/admin.entity";
import { AdminDcoument } from "../models/admin.model";

export class AmdinMapper {
  static toDomain(admin: AdminDcoument): Admin {
    return {
      id: admin._id.toString(),
      email: admin.email,
      password: admin.password,
      refreshToken: admin.refreshToken,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    };
  }
  static toPresistence(admin: Admin) {
    return {
      email: admin.email,
      password: admin.password,
      refreshToken: admin.refreshToken,
    };
  }
}
