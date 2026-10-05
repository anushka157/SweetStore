const { User } = require("../models/userModel");
require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const { Seller, SellerStoreAddress } = require("../models/sellerModel");
const { Customer, CustomerAddress } = require("../models/customerModel");
const JWT_PRIVATE_KEY = process.env.JWT_SECRET_PRIVATE_KEY;
const JWT_CUSTOMER_PRIVATE_KEY = process.env.JWT_SECRET_CUSTOMER_PRIVATE_KEY;

// CONTROLLERS
async function validateUserLogin(req, res) {
  const { email, password } = req.body;
  

  try {
    const results = await validateEmailHelper(email);

    console.log(results)
    if (results.message) {
      return res.status(401).json({
        message: results.message,
      });
    }
    if (results.length === 0) {
      return res.status(401).json({
        message: "No account found for this email",
      });
    }
    
    const userId = results[0].user_id;
    console.log("USER ID =", userId);
    const paswordHelperResult = await validatePasswordHelper(userId);
     console.log("PASSWORD RESULT =", paswordHelperResult);
    if (paswordHelperResult.length === 0) {
      return res.status(401).json({
        message: "Invalid ",
      });
    }

    const [{ hashedPassword, seller_id }] = paswordHelperResult


    const isValidPassword = await bcrypt.compare(
      password,
      hashedPassword
    );
    console.log("PASSWORD ENTERED =", password);
console.log("HASH FROM DB =", hashedPassword);
console.log("PASSWORD MATCH =", isValidPassword);
    if (isValidPassword) {
      console.log("JWT KEY =", JWT_PRIVATE_KEY);
console.log("SELLER ID =", seller_id);
      const jwtToken = jwt.sign({
        seller_id
      },
      JWT_PRIVATE_KEY,
      { expiresIn: '1h'}
    )


      return res.status(200).json({
        message: "Login succesfull",
        jwtToken
      });

    } else {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
}


const validateAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        User.AdminLogin(email, async (error, results) => {
            if (error) {
                console.error("Admin login error:", error);
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid admin credentials"
                });
            }

            const admin = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                admin.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid admin credentials"
                });
            }

            const token = jwt.sign(
                {
                    user_id: admin.user_id,
                    role: admin.role
                },
                process.env.JWT_ADMIN_PRIVATE_KEY,
                {
                    expiresIn: "1h"
                }
            );

            return res.status(200).json({
                message: "Admin login successful",
                jwtAdminToken: token
            });
        });

    } catch (error) {
        console.error("Admin login error:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
async function validateCustomerLogin(req, res) {
  const { email, password } = req.body;
  
  console.log("Custoemr", {email, password})

  try {
    const results = await validateEmailHelper(email);

    console.log("validata cus email", results)
    if (results.message) {
      return res.status(401).json({
        error: results.message,
      });
    }
    if (results.length === 0) {
      return res.status(401).json({
        error: "No account found for this email",
      });
    }
    
    const userId = results[0].user_id;
    
    const paswordHelperResult = await validateCustomerPasswordHelper({userId});
    console.log("Validate cus password", paswordHelperResult)
    if (paswordHelperResult.length === 0) {
      return res.status(401).json({
        error: "Invalid ",
      });
    }

    const [{ hashedPassword, customer_id }] = paswordHelperResult


    const isValidPassword = await bcrypt.compare(
      password,
      hashedPassword
    );
    if (isValidPassword) {
      
      const jwtCustomerToken = jwt.sign({
        customer_id
      },
      JWT_CUSTOMER_PRIVATE_KEY,
      { expiresIn: '1h'}
    )


      return res.status(200).json({
        message: "Customer Login succesfull",
        jwtCustomerToken
      });

    } else {
      return res.status(401).json({
        error: "Invalid Password",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message,
    });
  }
}

async function registerSeller(req, res) {
   console.log(req.body);
  const {
    email,
    password,
    businessName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,
  } = req.body;
  

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const modifyData = {
    userId,
    email,
    password: hashedPassword,
    role: "seller",
  };
  try {
    const results = await registerUserHelper(modifyData);

    if (results && results.affectedRows === 1) {
      const sellerId = uuidv4();
      const modifySellerInformation = {
        sellerId,
        registeredUserId: userId,
        businessName,
        phoneNumber,
      };

      const sellerEntryResult = await sellerEntryHelper(
        modifySellerInformation
      );

      if (sellerEntryResult && sellerEntryResult.affectedRows === 1) {
        const sellerAddressId = uuidv4();

        const modifySellerStoreAddressInfo = {
          sellerAddressId,
          sellerId,
          addressLine1,
          addressLine2,
          city,
          country,
          zipCode,
        };

        const sellerStoreAddressEntryResult =
          await sellerStoreAddressInfoHelper(modifySellerStoreAddressInfo);

        if (
          sellerStoreAddressEntryResult &&
          sellerStoreAddressEntryResult.affectedRows === 1
        ) {
          return res.status(201).json({
            message: "Seller Registered Successfully",
          });
        } else {
          return res.status(400).json({
            message: "Registration failed",
          });
        }
      } else {
        return res.status(400).json({
          message: "Registration failed",
        });
      }
    } else {
      return res.status(400).json({
        message: "Registration failed",
      });
    }
  } catch (error) {
    console.log("REGISTER SELLER ERROR:");
    console.log(error);
    if (error.code === "DUPLICATE_ENTRY") {
      return res.status(409).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "An internal server error occured",
    });
  }
}

async function registerCustomer(req, res) {
  const {
    email,
    password,
    customerName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,
  } = req.body;
  

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const modifyData = {
    userId,
    email,
    password: hashedPassword,
    role: "customer",
  };
  try {
    const results = await registerUserHelper(modifyData);
    console.log(results)

    if (results && results.affectedRows === 1) {
      const customerId = uuidv4();
      const modifyCustomerInformation = {
        customerId, registeredUserId: userId, customerName, phoneNumber
      };

      const customerEntryResult = await customerEntryHelper(
        modifyCustomerInformation
      );

      if (customerEntryResult && customerEntryResult.affectedRows === 1) {
        const customerAddressId = uuidv4();

        const modifyCustomerAddressInfo = {
          customerAddressId,
          customerId,
          addressLine1,
          addressLine2,
          city,
          country,
          zipCode,
        };

        const customerAddressEntryResult =
          await customerAddressInfoHelper(modifyCustomerAddressInfo);

        if (
          customerAddressEntryResult &&
          customerAddressEntryResult.affectedRows === 1
        ) {
          return res.status(201).json({
            message: "Customer Registered Successfully",
          });
        } else {
          return res.status(400).json({
            error: "Registration failed",
          });
        }
      } else {
        return res.status(400).json({
          error: "Registration failed",
        });
      }
    } else {
      return res.status(400).json({
        error: "Registration failed",
      });
    }
  } catch (error) {
    if (error.code === "DUPLICATE_ENTRY") {
      return res.status(409).json({
        error: error.message,
      });
    }
    return res.status(500).json({
      error: "An internal server error occured",
    });
  }
}

// HELPER FUNCTIONS
function validateEmailHelper(email) {
  return new Promise((resolve, reject) => {
    User.UserLoginEmail(email, (error, results) => {
      if (error)
        reject({
          message: error.message,
        });

      resolve(results);
    });
  });
}

function validatePasswordHelper(userId) {
  return new Promise((resolve, reject) => {
    User.UserLoginPassword(userId, (error, results) => {
      if (error)
        reject({
          message: error.message,
        });
      resolve(results);
    });
  });
}

function registerUserHelper(modifyData) {
  return new Promise((resolve, reject) => {
    User.UserRegister(modifyData, (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return reject({
            message: "The email is already in use.",
            code: "DUPLICATE_ENTRY",
          });
        }

        return reject({
          message: error.message,
          code: error.code,
        });
      }
      resolve(results);
    });
  });
}


// Seller
function sellerEntryHelper(modifySellerInformation) {
  return new Promise((resolve, reject) => {
    Seller.addSeller(modifySellerInformation, (error, results) => {
      if (error)
        reject({
          error: error.message,
        });
      resolve(results);
    });
  });
}

function sellerStoreAddressInfoHelper(modifySellerStoreAddressInfo) {
  return new Promise((resolve, reject) => {
    SellerStoreAddress.addSellerStoreAddress(
      modifySellerStoreAddressInfo,
      (error, results) => {
        if (error) {
          reject({
            error: error.message,
          });
        }
        resolve(results);
      }
    );
  });
}


//Custoer 
// function customerEntryHelper(modifyCustomerInformation) {
//   return new Promise((resolve, reject) => {
//     Customer.addCustomer(modifyCustomerInformation, (error, results) => {
//       if (error)
//         reject({
//           error: error.message,
//         });
//       resolve(results);
//     });
//   });
// }
function customerEntryHelper(modifyCustomerInformation) {
  return new Promise((resolve, reject) => {
    Customer.addCustomer(modifyCustomerInformation, (error, results) => {
      if (error) {
        console.log("CUSTOMER INSERT ERROR =", error);
        return reject(error);
      }

      console.log("CUSTOMER INSERT RESULT =", results);
      resolve(results);
    });
  });
}
function validateCustomerPasswordHelper(data) {
  return new Promise((resolve, reject) => {
    Customer.CustomerLoginPassword(data, (error, results) => {
      if (error)
        reject({
          message: error.message,
        });
      resolve(results);
    });
  });
}

function customerAddressInfoHelper(modifySellerStoreAddressInfo) {
  return new Promise((resolve, reject) => {
    CustomerAddress.addCustomerAddress(
      modifySellerStoreAddressInfo,
      (error, results) => {
        if (error) {
          reject({
            error: error.message,
          });
        }
        resolve(results);
      }
    );
  });
}

module.exports = {
  validateUserLogin,
  validateCustomerLogin,
  registerSeller,
  registerCustomer,
  validateAdminLogin
};


// ========== Registration Section ==============
// Challenge
// -- Get the user register as a seller. 
  //   For this we need three different table entries. The problem was to get all the information about the 
  //   user at once from the frontend(via user registration form) and make three entries in respective three tables
  //   Initially the user_id, seller_id, seller_address_id in the user, seller and seller_store_address table were
  //   Default uuid() and auto added. But this will mean it will need to retrive the ids first and then the further 
  //   consecutive steps will be applied. 
  //   Which means. for seller_id, we need the user_id as foreign key and so on. which will be difficult becuase the 
  //   the INSERT statement don't return the added row. 
// -- Solution was 
  //   to generate uuid() manually and add it to the respective tables. 
  //   so first the user_id will be generated. and the data needed for the user table entry will be grabbed from the 
  //   req.body which was email and password. 
  //   if everything goes well, then we will proceed to fill the seller table with generating seller_id and already 
  //   generated user_id from the previous step will be added as the foreingn key. in the seller table. 
  //   if that goes well we will do similar for seller_store_address table. 

  // Still there's a lot of error handling stuff pending.
  // ERROR HANDLING IS A BIG ISSUE. need to take care asap. 


  // ========== Login Section ==============
  // For further usage we will be needing the seller_id.
  // Such as for seller data update. seller_store_address data update. adding removing products
  // we will need seller_id. 
  // As discussed we will be adding the seller_id to JWT tokens and thus store it to user. and manage those actions.
  // with login request seller will send their email and since email is unique. we will query the seller table to
  // retrive the seller_id using that email. 
  // So basically querying the user table and join on seller table on user_id where the email address is "?" and
  // and return the email and seller id or what ever it is.
  // -- Solved -- 
  // stored seller id in payload. Now all server actions can use it