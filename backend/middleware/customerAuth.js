const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_CUSTOMER_PRIVATE_KEY =
  process.env.JWT_SECRET_CUSTOMER_PRIVATE_KEY;

function verifyCustomer(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER =", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Invalid authorization format"
      });
    }

    const decoded = jwt.verify(
      token,
      JWT_CUSTOMER_PRIVATE_KEY
    );

    console.log("DECODED CUSTOMER =", decoded);

    req.customer_id = decoded;

    next();

  } catch (error) {
    console.log("CUSTOMER AUTH ERROR =", error);

    return res.status(401).json({
      error: "Invalid or expired customer token"
    });
  }
}

module.exports = verifyCustomer;