import express from "express";
import { doctorList, doctorLogin } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/login", doctorLogin);
doctorRouter.get("/list", doctorList);

export default doctorRouter;
