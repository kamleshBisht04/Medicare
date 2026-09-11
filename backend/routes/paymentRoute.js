import express from "express";
import { paymentRazorpay } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order",authUser, paymentRazorpay);

export default paymentRouter;
