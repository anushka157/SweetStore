const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const { DeliveryPartner } = require("../models/deliveryPartnerModel");

const saltRounds = 10;


// =====================================================
// REGISTER DELIVERY PARTNER
// =====================================================

async function registerDeliveryPartner(req, res) {

  console.log("DELIVERY PARTNER REGISTER =", req.body);

  const {
    email,
    password,
    name,
    phoneNumber,
  } = req.body;

  if (
    !email ||
    !password ||
    !name ||
    !phoneNumber
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const userId = crypto.randomUUID();

  try {

    const hashedPassword =
      await bcrypt.hash(
        password,
        saltRounds
      );


    // -----------------------------------------
    // CREATE USER
    // -----------------------------------------

    const userResult =
      await registerUserHelper({
        userId,
        email,
        password: hashedPassword,
        role: "delivery_partner",
      });


    if (
      !userResult ||
      userResult.affectedRows !== 1
    ) {
      return res.status(400).json({
        message: "Registration failed",
      });
    }


    // -----------------------------------------
    // CREATE DELIVERY PARTNER
    // -----------------------------------------

    const deliveryPartnerId =
      crypto.randomUUID();

    const deliveryPartnerResult =
      await addDeliveryPartnerHelper({
        deliveryPartnerId,
        registeredUserId: userId,
        name,
        phoneNumber,
      });


    if (
      !deliveryPartnerResult ||
      deliveryPartnerResult.affectedRows !== 1
    ) {
      return res.status(400).json({
        message: "Registration failed",
      });
    }


    return res.status(201).json({
      message:
        "Delivery Partner Registered Successfully. Waiting for admin approval.",
    });

  } catch (error) {

    console.error(
      "DELIVERY PARTNER REGISTRATION ERROR =",
      error
    );

    if (
      error.code === "ER_DUP_ENTRY"
    ) {
      return res.status(409).json({
        message:
          "The email is already in use.",
      });
    }

    return res.status(500).json({
      message:
        "An internal server error occurred",
    });
  }
}


// =====================================================
// DELIVERY PARTNER LOGIN
// =====================================================

async function validateDeliveryPartnerLogin(
  req,
  res
) {

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message:
        "Email and password are required",
    });
  }

  try {

    const results =
      await deliveryPartnerLoginHelper(
        email
      );


    if (
      !results ||
      results.length === 0
    ) {
      return res.status(401).json({
        message:
          "No delivery partner account found for this email",
      });
    }


    const deliveryPartner =
      results[0];


    // -----------------------------------------
    // CHECK APPROVAL
    // -----------------------------------------

    if (
      deliveryPartner.approval_status ===
      "pending"
    ) {
      return res.status(403).json({
        message:
          "Your delivery partner account is waiting for admin approval.",
      });
    }


    if (
      deliveryPartner.approval_status ===
      "rejected"
    ) {
      return res.status(403).json({
        message:
          "Your delivery partner account has been rejected.",
      });
    }


    // -----------------------------------------
    // CHECK PASSWORD
    // -----------------------------------------

    const isValidPassword =
      await bcrypt.compare(
        password,
        deliveryPartner.password
      );


    if (!isValidPassword) {
      return res.status(401).json({
        message:
          "Invalid Password",
      });
    }


    // -----------------------------------------
    // CREATE JWT
    // -----------------------------------------

    const jwtDeliveryPartnerToken =
      jwt.sign(
        {
          delivery_partner_id:
            deliveryPartner.delivery_partner_id,
          user_id:
            deliveryPartner.user_id,
          role: "delivery_partner",
        },
        process.env.JWT_DELIVERY_PARTNER_PRIVATE_KEY,
        {
          expiresIn: "1h",
        }
      );


    return res.status(200).json({
      message:
        "Delivery Partner Login Successful",

      jwtDeliveryPartnerToken,
    });

  } catch (error) {

    console.error(
      "DELIVERY PARTNER LOGIN ERROR =",
      error
    );

    return res.status(500).json({
      message:
        "Something went wrong",
    });
  }
}


// =====================================================
// HELPERS
// =====================================================

function registerUserHelper(data) {

  return new Promise(
    (resolve, reject) => {

      User.UserRegister(
        data,
        (error, results) => {

          if (error) {
            return reject(error);
          }

          resolve(results);
        }
      );

    }
  );
}


function addDeliveryPartnerHelper(data) {

  return new Promise(
    (resolve, reject) => {

      DeliveryPartner.addDeliveryPartner(
        data,
        (error, results) => {

          if (error) {
            return reject(error);
          }

          resolve(results);
        }
      );

    }
  );
}


function deliveryPartnerLoginHelper(
  email
) {

  return new Promise(
    (resolve, reject) => {

      DeliveryPartner.deliveryPartnerLogin(
        email,
        (error, results) => {

          if (error) {
            return reject(error);
          }

          resolve(results);
        }
      );

    }
  );
}
async function fetchAssignedOrders(req, res) {
  try {
    const deliveryPartnerId =
      req.delivery_partner_id &&
      req.delivery_partner_id.delivery_partner_id;

    console.log(
      "DELIVERY PARTNER ID =",
      deliveryPartnerId
    );

    if (!deliveryPartnerId) {
      return res.status(401).json({
        error: "Unauthorized delivery partner",
      });
    }

    DeliveryPartner.getAssignedOrders(
      deliveryPartnerId,
      (error, results) => {
        if (error) {
          console.log(
            "FETCH DELIVERY PARTNER ORDERS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch assigned orders",
          });
        }

        return res.status(200).json({
          orders: results,
        });
      }
    );
  } catch (error) {
    console.log(
      "FETCH ASSIGNED ORDERS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

async function updateDeliveryStatus(req, res) {
  try {
    const deliveryPartnerId =
      req.delivery_partner_id &&
      req.delivery_partner_id.delivery_partner_id;

    const { orderItemId } = req.params;
    const { deliveryStatus } = req.body;

    if (!deliveryPartnerId) {
      return res.status(401).json({
        error: "Unauthorized delivery partner",
      });
    }

    if (!orderItemId || !deliveryStatus) {
      return res.status(400).json({
        error:
          "Order item ID and delivery status are required",
      });
    }

    const allowedStatuses = [
      "Assigned",
      "Picked Up",
      "Out for Delivery",
      "Delivered",
      "Failed Delivery",
    ];

    if (!allowedStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        error: "Invalid delivery status",
      });
    }

    DeliveryPartner.updateDeliveryStatus(
      {
        orderItemId,
        deliveryStatus,
        deliveryPartnerId,
      },
      (error, result) => {
        if (error) {
          console.log(
            "DELIVERY PARTNER STATUS UPDATE ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to update delivery status",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            error:
              "Order not found or not assigned to this delivery partner",
          });
        }

        return res.status(200).json({
          message:
            "Delivery status updated successfully",
        });
      }
    );
  } catch (error) {
    console.log(
      "DELIVERY PARTNER STATUS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
module.exports = {
  registerDeliveryPartner,
  validateDeliveryPartnerLogin,
  fetchAssignedOrders,
  updateDeliveryStatus,
};