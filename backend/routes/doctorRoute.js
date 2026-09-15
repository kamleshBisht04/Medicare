import express from "express";
import { doctorList, doctorLogin, getDoctorAppointment, getDoctorProfile, updateAppointmentStatus } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/list", doctorList);
doctorRouter.get("/all-appointments", authDoctor, getDoctorAppointment);
doctorRouter.put("/update-appointment-status", authDoctor, updateAppointmentStatus);
doctorRouter.get("/getDoctor-Profile", authDoctor, getDoctorProfile);

export default doctorRouter;
