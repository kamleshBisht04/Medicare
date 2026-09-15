import express from "express";
import { doctorList, doctorLogin } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/list", doctorList);

export default doctorRouter;
