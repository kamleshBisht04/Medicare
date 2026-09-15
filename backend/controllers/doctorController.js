import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API for doctor login

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: doctor._id,
        role: "doctor",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    // remove the password

    return res.status(200).json({
      success: true,
      message: "Doctor login successful",
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API FOR CHANGEING AVAILABILITY OF DOCTOR

const changeAvailablity = async (req, res) => {
  try {
    const { id, available } = req.body;

    await doctorModel.findByIdAndUpdate(id, {
      available,
    });
    res.status(200).json({
      success: true,
      message: "Doctor availability updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API FOR DOCTORS LIST TO FRONT END

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-email", "-password"]);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Doctor Appointments

const getDoctorAppointment = async (req, res) => {
  try {
    const doctorId = req.doctor.id;

    const appointments = await appointmentModel.find({ docId: doctorId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//API doctor to update the status

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    const allowedStatus = ["pending", "confirmed", "completed", "cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Doctor can update only his own appointment
    if (appointment.docId.toString() !== req.doctor.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update",
      });
    }

    appointment.status = status;

    // Keep cancelled field in sync
    appointment.cancelled = status === "cancelled";

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: `Appointment ${status} `,
      appointment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get doctor profile for doctor dashboard

const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;

    const doctor = await doctorModel.findById(docId).select(["-password", "-slots_booked"]);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor profile fetched .",
      doctor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export {
  doctorLogin,
  changeAvailablity,
  doctorList,
  getDoctorAppointment,
  updateAppointmentStatus,
  getDoctorProfile,
};
