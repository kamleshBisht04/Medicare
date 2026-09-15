import express from "express";
import { doctorList, doctorLogin, getDoctorAppointment } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/list", doctorList);
doctorRouter.get("/all-appointments", authDoctor, getDoctorAppointment);

export default doctorRouter;
