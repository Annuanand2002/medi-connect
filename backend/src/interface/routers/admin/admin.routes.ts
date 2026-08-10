import { Router } from "express";
import container from "../../../di/container/container";
import { TYPES } from "../../../di/types/types";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { AdminController } from "../../controllers/admin/adminAuth.controller";
import { DepartmentController } from "../../controllers/department/department.controller";
import { DoctorRequestController } from "../../controllers/doctor/doctor.req.controller";
import ApproveDoctorRequestController from "../../controllers/doctor/approveDoctorReq.controller";
import { VerifyDoctorSetupTokenController } from "../../controllers/doctor/verifyDoctorSetupToken.controller";
import { RejectDoctorRequestController } from "../../controllers/doctor/rejectDoctirRequest.controller";
import { ITokenService } from "../../../domain/services/ITokenService";
import { GetFileURlController } from "../../controllers/service/getFileUrl.controller";


const router = Router();

const tokenService = container.get<ITokenService>(TYPES.JWTService)
const authenticateAdmin = authenticate(tokenService,"admin")
const adminController =  container.get<AdminController>(TYPES.AdminController)
const departmentController = container.get<DepartmentController>(TYPES.DepartmentController)
const doctorRequestController = container.get<DoctorRequestController>(TYPES.DoctorRequestController)
const approveDoctorReqController = container.get<ApproveDoctorRequestController>(TYPES.ApproveDoctorRequestController)
const verificationTokenController = container.get<VerifyDoctorSetupTokenController>(TYPES.VerifyDoctorSetupTokenController)
const rejectController = container.get<RejectDoctorRequestController>(TYPES.RejectDoctorRequestController)
const getFileURlController = container.get<GetFileURlController>(TYPES.GetFileURlController)


router.post("/login", adminController.login);
router.post("/refresh-token", adminController.refreshToken);
router.post('/logout',adminController.logout);

//department
router.get('/department',authenticateAdmin,departmentController.getAllDepartment)
router.post('/department',authenticateAdmin,departmentController.createDepartment)
router.put('/department/:id',authenticateAdmin,departmentController.updateDepartment)
router.delete('/department/:id',authenticateAdmin,departmentController.deleteDepartment)
router.patch('/department/:id',authenticateAdmin,departmentController.restoreDepartment)

//doctor-req
router.get('/doctor-request',authenticateAdmin,doctorRequestController.getAllDoctorRequest)
router.get("/doctor-request/file",authenticateAdmin,getFileURlController.getSignedFileUrl);
router.get('/doctor-request/:id',authenticateAdmin,doctorRequestController.getDoctorReq)
router.patch('/doctor-request/approve',authenticateAdmin,approveDoctorReqController.handle)
router.get('/setup-password',verificationTokenController.handle)
router.patch('/doctor-request/reject',authenticateAdmin,rejectController.handle)

export default router;
