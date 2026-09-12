import express from "express";
import { paymentRazorpay, verifyPayment } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authUser, paymentRazorpay);
paymentRouter.post("/verify-payment", authUser, verifyPayment);

export default paymentRouter;
