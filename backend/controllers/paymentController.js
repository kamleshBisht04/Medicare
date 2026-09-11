import Razorpay from "razorpay";
import appointmentModel from "../models/appointmentModel.js";
import Payment from "../models/paymentModel.js";

//API to make payment of appointment using razorpay

const razorpay = new Razorpay({
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
      currency: process.env.VITE_CURRENCY,
      receipt: `appointment_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);
    // Save payment details in database

    const payment = await Payment.create({
      userId,
      appointmentId,
      razorpayOrderId: order.id,
      currency: process.env.VITE_CURRENCY,
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

export { paymentRazorpay };
