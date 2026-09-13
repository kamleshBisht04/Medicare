import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

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
    const appointments = await appointmentModel.find({});

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
    const appointment = await appointmentModel.findById(appointmentId);

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
      message:
        status === "confirmed"
          ? "Appointment confirmed successfully"
          : "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addDoctor, loginAdmin, getAllDoctors, allAppointments, updateAppointmentStatus };
