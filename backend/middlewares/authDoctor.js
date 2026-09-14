import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
   
  
    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login again",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
   
    if (token_decode.role !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    req.doctor = token_decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authDoctor;
