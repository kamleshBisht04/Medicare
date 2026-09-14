import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

//API for adding doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      experience,
      fees,
      speciality,
      degree,
      about,
      street,
      city,
      state,
      district,
      pincode,
    } = req.body;

    const imageFile = req.file;

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !experience ||
      !fees ||
      !speciality ||
      !degree ||
      !about ||
      !street ||
      !city ||
      !state ||
      !district ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //// Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create doctor data
    const doctorData = {
      name: name.startsWith("Dr.") ? name : `Dr. ${name}`,
      email,
      password: hashedPassword,
      image: imageUrl,
      experience,
      fees,
      speciality,
      degree,
      about,
      address: {
        street,
        city,
        district,
        state,
        pincode,
      },
      date: Date.now(),
    };

    // Save doctor
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check email and password
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Create JWT token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TO GET ALL DOCTORS

// API to get all doctors list for admin panel
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");

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

// API to get all appointments

const allAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ createdAt: -1 });

    if (appointments.length === 0) {
      return res.status(200).json({
        success: true,
        appointments: [],
        message: "No appointments have been scheduled yet.",
      });
    }
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

// API to update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    // Validate status
    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    // Find appointment
    const appointment = await appointmentModel.findById(appointmentId).sort({ createdAt: -1 });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Update status
    appointment.status = status;

    // If appointment is cancelled
    if (status === "cancelled") {
      appointment.cancelled = true;
    }

    // If appointment is confirmed
    if (status === "confirmed") {
      appointment.cancelled = false;
    }

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: status === "confirmed" ? "Appointment confirmed " : "Appointment cancelled ",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ADMIN DASHBOARD DATA
const getDashboardData = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments({});
    const totalPatients = await userModel.countDocuments({});
    const appointments = await appointmentModel.find({}).sort({ createdAt: -1 }).lean();

    const totalAppointments = appointments.length;

    const pendingAppointments = appointments.filter(
      (item) => !item.status || item.status === "pending",
    ).length;

    const confirmedAppointments = appointments.filter((item) => item.status === "confirmed").length;

    const cancelledAppointments = appointments.filter((item) => item.status === "cancelled").length;

    const paidAppointments = appointments.filter(
      (item) => item.payment === true || item.paymentStatus === "paid",
    ).length;

    const pendingPayments = appointments.filter(
      (item) => item.payment !== true && item.paymentStatus !== "paid",
    ).length;

    const totalRevenue = appointments
      .filter((item) => item.payment === true || item.paymentStatus === "paid")
      .reduce((total, item) => total + Number(item.amount || item.docData?.fees || 0), 0);

    // TODAY'S APPOINTMENTS
    const today = new Date();

    const todayDate = `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`;

    const todayAppointments = appointments.filter((item) => item.slotDate === todayDate).length;

    // LAST 7 DAYS APPOINTMENT TREND
    const appointmentTrend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();

      date.setDate(date.getDate() - (6 - index));

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const count = appointments.filter((item) => item.slotDate === slotDate).length;

      return {
        name: `${day}/${month}`,
        appointments: count,
      };
    });

    // RECENT APPOINTMENTS
    const recentAppointments = appointments.slice(0, 6);

    res.status(200).json({
      success: true,

      dashData: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        cancelledAppointments,

        paidAppointments,
        pendingPayments,

        totalRevenue,
        todayAppointments,

        appointmentTrend,
        recentAppointments,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API for geting appointment data particular date
const getDashboardDateData = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    // HTML date: 2026-09-14
    // Appointment date: 14_9_2026

    const selectedDate = new Date(date);

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    const slotDate = `${day}_${month}_${year}`;

    const appointments = await appointmentModel.find({ slotDate }).sort({ slotTime: 1 }).lean();

    const totalAppointments = appointments.length;

    const confirmedAppointments = appointments.filter((item) => item.status === "confirmed").length;

    const pendingAppointments = appointments.filter(
      (item) => !item.status || item.status === "pending",
    ).length;

    const cancelledAppointments = appointments.filter((item) => item.status === "cancelled").length;

    const paidAppointments = appointments.filter(
      (item) => item.payment === true || item.paymentStatus === "paid",
    ).length;

    const pendingPayments = appointments.filter(
      (item) => item.payment !== true && item.paymentStatus !== "paid",
    ).length;

    const totalRevenue = appointments
      .filter((item) => item.payment === true || item.paymentStatus === "paid")
      .reduce((total, item) => total + Number(item.amount || item.docData?.fees || 0), 0);

    return res.status(200).json({
      success: true,

      data: {
        date: slotDate,
        totalAppointments,
        confirmedAppointments,
        pendingAppointments,
        cancelledAppointments,
        paidAppointments,
        pendingPayments,
        totalRevenue,
        appointments,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  allAppointments,
  updateAppointmentStatus,
  getDashboardData,
  getDashboardDateData,
};
