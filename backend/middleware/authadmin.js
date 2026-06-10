import jwt from "jsonwebtoken";

// admin authentication middelwere

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authroized login Again",
      });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // console.log("TOKEN:", atoken);
    // console.log(decoded);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: not admin",
      });
    }
    // 3. attach admin data to request
    req.admin = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;
