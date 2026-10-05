
const { Admin } = require("../models/adminModel");


// =====================================================
// PRODUCTS
// =====================================================

async function getPendingProducts(req, res) {

  try {

    Admin.getPendingProducts(
      (error, results) => {

        if (error) {
          console.log(
            "GET PENDING PRODUCTS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch pending products",
          });
        }

        return res.status(200).json({
          products: results,
        });
      }
    );

  } catch (error) {

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// =====================================================
// GET ALL SELLER PRODUCTS
// =====================================================

async function getAllSellerProducts(req, res) {

  try {

    Admin.getAllSellerProducts(
      (error, results) => {

        if (error) {

          console.log(
            "GET ALL SELLER PRODUCTS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch seller products",
          });
        }

        return res.status(200).json({
          products: results,
        });
      }
    );

  } catch (error) {

    console.log(
      "GET ALL SELLER PRODUCTS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
async function approveProduct(req, res) {

  const { productId } = req.params;

  Admin.approveProduct(
    productId,
    (error, result) => {

      if (error) {
        console.log(
          "APPROVE PRODUCT ERROR =",
          error
        );

        return res.status(500).json({
          error: "Unable to approve product",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "Product not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Product approved successfully",
      });
    }
  );
}


async function rejectProduct(req, res) {

  const { productId } = req.params;

  Admin.rejectProduct(
    productId,
    (error, result) => {

      if (error) {
        console.log(
          "REJECT PRODUCT ERROR =",
          error
        );

        return res.status(500).json({
          error: "Unable to reject product",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "Product not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Product rejected successfully",
      });
    }
  );
}


// =====================================================
// SELLERS
// =====================================================

async function getPendingSellers(req, res) {

  try {

    Admin.getPendingSellers(
      (error, results) => {

        if (error) {
          console.log(
            "GET PENDING SELLERS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch pending sellers",
          });
        }

        return res.status(200).json({
          sellers: results,
        });
      }
    );

  } catch (error) {

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}


async function approveSeller(req, res) {

  const { sellerId } = req.params;

  Admin.approveSeller(
    sellerId,
    (error, result) => {

      if (error) {
        console.log(
          "APPROVE SELLER ERROR =",
          error
        );

        return res.status(500).json({
          error: "Unable to approve seller",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "Seller not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Seller approved successfully",
      });
    }
  );
}


async function rejectSeller(req, res) {

  const { sellerId } = req.params;

  Admin.rejectSeller(
    sellerId,
    (error, result) => {

      if (error) {
        console.log(
          "REJECT SELLER ERROR =",
          error
        );

        return res.status(500).json({
          error: "Unable to reject seller",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "Seller not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Seller rejected successfully",
      });
    }
  );
}


// =====================================================
// DELIVERY PARTNERS
// =====================================================

async function getPendingDeliveryPartners(
  req,
  res
) {

  try {

    Admin.getPendingDeliveryPartners(
      (error, results) => {

        if (error) {
          console.log(
            "GET PENDING DELIVERY PARTNERS ERROR =",
            error
          );

          return res.status(500).json({
            error:
              "Unable to fetch pending delivery partners",
          });
        }

        return res.status(200).json({
          deliveryPartners: results,
        });
      }
    );

  } catch (error) {

    console.log(
      "GET PENDING DELIVERY PARTNERS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}


async function approveDeliveryPartner(
  req,
  res
) {

  const {
    deliveryPartnerId,
  } = req.params;

  Admin.approveDeliveryPartner(
    deliveryPartnerId,
    (error, result) => {

      if (error) {

        console.log(
          "APPROVE DELIVERY PARTNER ERROR =",
          error
        );

        return res.status(500).json({
          error:
            "Unable to approve delivery partner",
        });
      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          error:
            "Delivery partner not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Delivery partner approved successfully",
      });
    }
  );
}

// async function assignDeliveryPartner(req, res) {

//   const { orderItemId } = req.params;
//   const { deliveryPartnerId } = req.body;

//   if (!orderItemId || !deliveryPartnerId) {
//     return res.status(400).json({
//       error:
//         "Order item ID and delivery partner ID are required",
//     });
//   }

//   try {

//     Admin.assignDeliveryPartner(
//       orderItemId,
//       deliveryPartnerId,
//       (error, result) => {

//         if (error) {

//           console.log(
//             "ASSIGN DELIVERY PARTNER ERROR =",
//             error
//           );

//           return res.status(500).json({
//             error:
//               "Unable to assign delivery partner",
//           });
//         }

//         if (result.affectedRows === 0) {

//           return res.status(404).json({
//             error:
//               "Order item not found",
//           });
//         }

//         return res.status(200).json({
//           message:
//             "Delivery partner assigned successfully",
//         });
//       }
//     );

//   } catch (error) {

//     console.log(
//       "ASSIGN DELIVERY PARTNER ERROR =",
//       error
//     );

//     return res.status(500).json({
//       error: "Something went wrong",
//     });
//   }
// }
async function assignDeliveryPartner(req, res) {
  const { orderItemId } = req.params;
  const { deliveryPartnerId } = req.body;

  console.log("ORDER ITEM ID =", orderItemId);
  console.log("DELIVERY PARTNER ID =", deliveryPartnerId);

  if (!orderItemId || !deliveryPartnerId) {
    return res.status(400).json({
      error: "Order item ID and delivery partner ID are required",
    });
  }

  try {
    Admin.assignDeliveryPartner(
      orderItemId,
      deliveryPartnerId,
      (error, result) => {
        if (error) {
          console.log("MYSQL ASSIGN ERROR =", error);

          return res.status(500).json({
            error: error.message,
            code: error.code,
            sqlMessage: error.sqlMessage,
          });
        }

        console.log("ASSIGN RESULT =", result);

        if (result.affectedRows === 0) {
          return res.status(404).json({
            error: "Order item not found",
          });
        }

        return res.status(200).json({
          message: "Delivery partner assigned successfully",
        });
      }
    );
  } catch (error) {
    console.log("ASSIGN DELIVERY PARTNER ERROR =", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
async function rejectDeliveryPartner(
  req,
  res
) {

  const {
    deliveryPartnerId,
  } = req.params;

  Admin.rejectDeliveryPartner(
    deliveryPartnerId,
    (error, result) => {

      if (error) {

        console.log(
          "REJECT DELIVERY PARTNER ERROR =",
          error
        );

        return res.status(500).json({
          error:
            "Unable to reject delivery partner",
        });
      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          error:
            "Delivery partner not found or already processed",
        });
      }

      return res.status(200).json({
        message:
          "Delivery partner rejected successfully",
      });
    }
  );
}

async function getProductDetails(req, res) {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({
      error: "Product ID is required",
    });
  }

  try {
    Admin.getProductDetails(productId, (error, results) => {
      if (error) {
        console.log("GET PRODUCT DETAILS ERROR =", error);

        return res.status(500).json({
          error: "Unable to fetch product details",
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      return res.status(200).json({
        product: results[0],
      });
    });
  } catch (error) {
    console.log("GET PRODUCT DETAILS ERROR =", error);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
async function getUnassignedOrders(req, res) {

  try {

    Admin.getUnassignedOrders(
      (error, results) => {

        if (error) {

          console.log(
            "GET ORDERS FOR ADMIN ERROR =",
            error
          );

          return res.status(500).json({
            error:
              "Unable to fetch orders",
          });
        }

        return res.status(200).json({
          orders: results,
        });
      }
    );

  } catch (error) {

    console.log(
      "GET ORDERS FOR ADMIN ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

// =====================================================
// ALL ORDERS
// =====================================================

async function getAllOrders(req, res) {

  try {

    Admin.getAllOrders(
      (error, results) => {

        if (error) {

          console.log(
            "GET ALL ORDERS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch all orders",
          });
        }

        return res.status(200).json({
          orders: results,
        });
      }
    );

  } catch (error) {

    console.log(
      "GET ALL ORDERS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
module.exports = {

  // PRODUCTS
getPendingProducts,
getAllSellerProducts,
approveProduct,
getProductDetails,
rejectProduct,

  // SELLERS
  getPendingSellers,
  approveSeller,
  rejectSeller,

  // DELIVERY PARTNERS
  getPendingDeliveryPartners,
  approveDeliveryPartner,
  rejectDeliveryPartner,


   // ORDER ASSIGNMENT
  assignDeliveryPartner,
  getUnassignedOrders,
  getAllOrders,
};