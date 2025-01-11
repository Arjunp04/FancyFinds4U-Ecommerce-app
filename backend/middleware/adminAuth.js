import jwt from "jsonwebtoken";

// requires admin permission for certain api's
const adminAuth = async (req, res, next) => {
  try {
    const { admintoken } = req.headers;
    if (!admintoken) {
      return res.json({
        success: false,
        message: "No token provided",
      });
    }
    const decodeToken = jwt.verify(admintoken, process.env.JWT_SECRET);
   
      
    // Validate the token payload without exposing sensitive data
    const expectedTokenData = Buffer.from(
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
      ).toString("base64");
     
      
    if (decodeToken.data !== expectedTokenData) {
      return res.status(403).json({
        success: false,
        message: "Not authorized. Please login again.",
      });
    }

    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token or session expired. Please login again.",
    });
  }
};

export default adminAuth;
