const crypto = require("crypto");

const {
  Seller,
  SellerStoreAddress,
} = require("../models/sellerModel");

// =====================================================
// GET ALL PRODUCTS BY SELLER
// =====================================================

async function fetchAllProductsBySellerId(req, res) {
  console.log("REQ SELLER =", req.seller_id);

  const { seller_id } = req.seller_id;

  console.log(
    "SELLER ID USED FOR QUERY =",
    seller_id
  );

  try {
    const allProductByIdResults =
      await allProductByIdHelper({
        seller_id,
      });

    console.log(
      "PRODUCTS RETURNED FROM DB =",
      allProductByIdResults
    );

    console.log(
      "PRODUCT COUNT =",
      allProductByIdResults.length
    );

    if (
      !Array.isArray(allProductByIdResults) ||
      allProductByIdResults.length === 0
    ) {
      return res.status(404).json({
        error: "No product found",
      });
    }

    return res.status(200).json({
      allProductByIdResults,
    });

  } catch (error) {
    console.error(
      "FETCH SELLER PRODUCTS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

function allProductByIdHelper(data) {
  return new Promise((resolve, reject) => {
    Seller.allproductBySellerId(
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        }

        return resolve(results);
      }
    );
  });
}

// =====================================================
// UPDATE SELLER PROFILE
// =====================================================

async function updateSellerProfile(req, res) {
  const { seller_id } = req.seller_id;

  console.log(
    "UPDATING SELLER PROFILE =",
    seller_id
  );

  console.log(
    "PROFILE DATA =",
    req.body
  );

  const {
    businessName,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
  } = req.body;

  try {
    // -----------------------------------------
    // UPDATE SELLER TABLE
    // -----------------------------------------

    const sellerResult =
      await updateSellerHelper({
        sellerId: seller_id,
        businessName,
        phoneNumber,
      });

    console.log(
      "SELLER UPDATE RESULT =",
      sellerResult
    );

    // -----------------------------------------
    // UPDATE ADDRESS
    // -----------------------------------------

    const addressResult =
      await updateSellerAddressHelper({
        sellerId: seller_id,
        addressLine1: address,
        addressLine2: "",
        city,
        country,
        zipCode,
      });

    console.log(
      "ADDRESS UPDATE RESULT =",
      addressResult
    );

    // -----------------------------------------
    // IF ADDRESS DOES NOT EXIST, INSERT IT
    // -----------------------------------------

    if (addressResult.affectedRows === 0) {
      console.log(
        "NO ADDRESS ROW FOUND - INSERTING ADDRESS"
      );

      await addSellerAddressHelper({
        sellerAddressId: crypto.randomUUID(),
        sellerId: seller_id,
        addressLine1: address,
        addressLine2: "",
        city,
        country,
        zipCode,
      });
    }

    return res.status(200).json({
      message:
        "Seller profile updated successfully",
    });

  } catch (error) {
    console.error(
      "UPDATE SELLER PROFILE ERROR =",
      error
    );

    return res.status(500).json({
      error:
        error.message ||
        "Something went wrong",
    });
  }
}

// =====================================================
// SELLER UPDATE HELPERS
// =====================================================

function updateSellerHelper(data) {
  return new Promise((resolve, reject) => {
    Seller.updateSellerProfile(
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      }
    );
  });
}

function updateSellerAddressHelper(data) {
  return new Promise((resolve, reject) => {
    SellerStoreAddress.updateSellerStoreAddress(
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      }
    );
  });
}

function addSellerAddressHelper(data) {
  return new Promise((resolve, reject) => {
    SellerStoreAddress.addSellerStoreAddress(
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      }
    );
  });
}

// =====================================================
// DELETE SELLER PRODUCT
// =====================================================

async function deleteProduct(req, res) {
  const { seller_id } = req.seller_id;
  const { productId } = req.params;

  console.log(
    "DELETE PRODUCT REQUEST =",
    productId
  );

  console.log(
    "SELLER ID =",
    seller_id
  );

  try {
    const result = await deleteProductHelper({
      productId,
      sellerId: seller_id,
    });

    console.log(
      "DELETE RESULT =",
      result
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "Product not found or you are not authorized to delete this product",
      });
    }

    return res.status(200).json({
      message:
        "Product deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE SELLER PRODUCT ERROR =",
      error
    );

    return res.status(500).json({
      error:
        error.message ||
        "Unable to delete product",
    });
  }
}

// =====================================================
// DELETE PRODUCT HELPER
// =====================================================

function deleteProductHelper(data) {
  return new Promise((resolve, reject) => {
    Seller.deleteProduct(
      data,
      (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve(results);
      }
    );
  });
}

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  fetchAllProductsBySellerId,
  updateSellerProfile,
  deleteProduct,
};