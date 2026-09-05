import doctorModel from "../models/doctorModel.js";

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

export { changeAvailablity };
