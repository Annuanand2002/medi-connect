import { Router } from "express";
import { adminController, authenticateAdmin } from "../../container/admin.conatiner";
import { departmentController } from "../../container/department.container";
import { approveDoctorReqController, doctorRequestController, rejectController, verificationTokenController } from "../../container/doctorRequest.container";


const router = Router();

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
router.get('/doctor-request/:id',authenticateAdmin,doctorRequestController.getDoctorReq)
router.patch('/doctor-request/approve',authenticateAdmin,approveDoctorReqController.handle)
router.get('/setup-password',verificationTokenController.handle)
router.patch('/doctor-request/reject',authenticateAdmin,rejectController.handle)

export default router;
