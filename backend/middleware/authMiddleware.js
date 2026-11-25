
const jwt = require("jsonwebtoken");

// VERIFY JWT TOKEN
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};


// CHECK USER ROLE
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if (
      !req.user ||
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Access forbidden. You do not have permission.",
      });
    }

    next();
  };
};


// EXPORT BOTH MIDDLEWARE FUNCTIONS
module.exports = {
  authMiddleware,
  authorizeRoles,
};
