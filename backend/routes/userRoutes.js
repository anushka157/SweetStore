const express = require("express");
const router = express.Router();

const {
    registerSeller,
    registerCustomer,
    validateUserLogin,
    validateCustomerLogin,
    validateAdminLogin
} = require("../controllers/userController");

router.post("/seller/register", registerSeller);

router.post("/seller/login", validateUserLogin);

router.post("/customer/register", registerCustomer);

router.post("/customer/login", validateCustomerLogin);

router.post("/admin/login", validateAdminLogin);
module.exports = router;