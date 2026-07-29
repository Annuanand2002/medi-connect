import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./shared/middlewares/errorHandler";
import adminRouter from "./interface/routers/admin/admin.routes";
import doctorRequestRouter from './interface/routers/doctor/doctor..router'

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter);
app.use('/doctor',doctorRequestRouter)
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("mediconnect api is running");
});
export default app;
