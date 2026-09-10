import express from "express";
import upload from "../middlewares/multer.js";
import { bookAppointment, cancelAppointment, getAppointments, getProfile, loginUser, registerUser, updateProfile, } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.put("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/get-appointments", authUser, getAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
