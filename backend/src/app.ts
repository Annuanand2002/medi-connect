import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./shared/middlewares/errorHandler";
import adminRouter from "./interface/routers/admin/admin.routes";
import doctorRequestRouter from "./interface/routers/doctor/doctor..router";
import patientRouter from "./interface/routers/patient/pateint.router";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter);
app.use("/doctor", doctorRequestRouter);
app.use("/patient", patientRouter);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("mediconnect api is running");
});
export default app;
