import Razorpay from "razorpay";
import appointmentModel from "../models/appointmentModel.js";
import Payment from "../models/paymentModel.js";
import crypto from "crypto";

//API to make payment of appointment using razorpay

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

   

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.userId.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    if (appointment.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already paid",
      });
    }

    const options = {
      amount: appointment.amount * 100,
      currency: process.env.CURRENCY,
      receipt: `appointment_${appointmentId}`,
    };

    const order = await razorpayInstance.orders.create(options);


    // Save payment details in database

    const payment = await Payment.create({
      userId,
      appointmentId,
      razorpayOrderId: order.id,
      currency: process.env.CURRENCY,
      amount: appointment.amount,
      status: "created",
    });

    res.status(201).json({
      success: true,
      message: "Payment order created",
      order,
      paymentId: payment._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay Payment
const verifyPayment = async (req, res) => {
  console.log("VERIFY BODY:", req.body);

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const userId = req.userId;

    // Find payment belonging to logged-in user
    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
      userId,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Prevent duplicate verification
    if (payment.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare signature
    if (generatedSignature !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update payment
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "paid";

    await payment.save();

    // Update appointment
    await appointmentModel.findByIdAndUpdate(payment.appointmentId, {
      paymentStatus: "paid",
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { paymentRazorpay, verifyPayment };
