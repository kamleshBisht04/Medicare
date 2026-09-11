import express from "express";
import { paymentRazorpay } from "../controllers/paymentController";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", paymentRazorpay);

export default paymentRouter;
