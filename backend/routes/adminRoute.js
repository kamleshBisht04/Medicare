import express from "express";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {
  addDoctor,
  allAppointments,
  getAllDoctors,
  loginAdmin,
  updateAppointmentStatus,
} from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/doctor-list", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/all-appointments", authAdmin, allAppointments);
adminRouter.post("/update-appointment-status", authAdmin, updateAppointmentStatus);

export default adminRouter;
