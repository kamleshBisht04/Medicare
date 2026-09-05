import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor, changeAvailablity, getAllDoctors, loginAdmin, } from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/doctor-list", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);

export default adminRouter;
