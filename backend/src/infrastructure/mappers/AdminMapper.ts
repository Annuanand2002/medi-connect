import Admin from "../../domain/entities/admin/admin.entity";
import { AdminDcoument } from "../database/models/admin.model";

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
  static toPersistence(admin: Partial<Admin>) {
    return {
      email: admin.email,
      password: admin.password,
      refreshToken: admin.refreshToken,
    };
  }
}
