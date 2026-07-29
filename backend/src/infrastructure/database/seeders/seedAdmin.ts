import  AdminModel  from "../models/admin.model";
import { HashService } from "../../services/hashService.repo.imple";

import logger from "../../../shared/loggers/logger";

export const seedAdmin = async (): Promise<void> => {
  try {
    const existingAdmin = await AdminModel.findOne({
      email: process.env.ADMIN_USERNAME,
    });

    if (existingAdmin) {
      logger.info("Admin already exists.");
      return;
    }

    const hashService = new HashService();

    const hashedPassword = await hashService.hashValue(
      process.env.ADMIN_PASSWORD!
    );

    await AdminModel.create({
      email: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    });

    logger.info("Admin seeded successfully.");
  } catch (error) {
    logger.error("Failed to seed admin", error);
    throw error;
  }
};