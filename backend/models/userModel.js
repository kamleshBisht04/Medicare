import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    image: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    dob: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    height: {
      type: String,
      default: "",
    },

    weight: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    allergies: {
      type: String,
      default: "",
    },

    medicalHistory: {
      type: String,
      default: "",
    },

    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
