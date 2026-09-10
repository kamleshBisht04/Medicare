import contactModel from "../models/contactModel.js";

// API for sending message to team as contact
const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const contact = new contactModel({
      name,
      email,
      message,
    });

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Message sent!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { sendContactMessage };
