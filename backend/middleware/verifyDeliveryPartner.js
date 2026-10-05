const jwt = require("jsonwebtoken");

function verifyDeliveryPartner(req, res, next) {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  const token =
    authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_DELIVERY_PARTNER_PRIVATE_KEY
      );

    req.delivery_partner_id =
      decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

module.exports =
  verifyDeliveryPartner;