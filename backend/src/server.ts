import dotenv from "dotenv";
dotenv.config();
import logger from "./shared/loggers/logger";
import "reflect-metadata"


import app from "./app";
import connectDB from "./infrastructure/database/db";
import env from "./shared/config/env";
import { seedAdmin } from "./infrastructure/database/seeders/seedAdmin";

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

startServer();
