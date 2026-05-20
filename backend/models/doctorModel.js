import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
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

    speciality: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
      trim: true,
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    address: {
      line1: {
        type: String,
        required: true,
        trim: true,
      },

      line2: {
        type: String,
        required: true,
        trim: true,
      },
    },

    available: {
      type: Boolean,
      default: true,
    },

    slots_booked: {
      type: Object,
      default: {},
    },

    date: {
      type: Number,
      default: Date.now,
    },
  },
  {
    minimize: false,
    timestamps: true,
  },
);

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
