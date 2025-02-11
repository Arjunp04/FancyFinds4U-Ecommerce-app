import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Session expired. Please log in again.",
        tokenExpired: true,
      });
    }
    res.json({
      success: false,
      message: "Invalid Token. Please log in again.",
    });
  }
};

export default authUser;
