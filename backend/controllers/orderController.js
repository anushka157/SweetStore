const { v4: uuidv4 } = require("uuid");
const { Order, OrderItems } = require("../models/orderModel");


async function orderCheckout(req, res) {
    console.log("CHECKOUT ROUTE HIT");
console.log("BODY =", req.body);
    console.log("REQ CUSTOMER =", req.customer_id);

    const {
        cart,
        totalAmount
    } = req.body;

    const customerId =
  req.customer_id &&
  req.customer_id.customer_id;
    if(!customerId) {
        return res.status(401).json({
            error: "Unauthorized. Please login"
        })
    }

    if(!cart || (cart && cart.length === 0) || !totalAmount) {
        return res.status(400).json({
            error: "Invalid Entries"
        })
    }

    try {
        const orderId = uuidv4();
        const orderEntriesData = {
            orderId,
            customerId,
            totalAmount
        }

        const orderEntryResult = await orderEntryHelper(orderEntriesData);

        if(orderEntryResult.error) {
            return res.status(422).json({
                error: "Error occured while order entry <O>"
            })
        }

       
        // const arrayOfArrays = cart.map(item => {
        //     const orderItemId = uuidv4();
        //     return [orderItemId, orderId, ...Object.values(item)]
        // });
        const arrayOfArrays = cart.map(item => {

    const orderItemId = uuidv4();

    const totalPrice = item.price * item.quantity;

    return [
        orderItemId,
        orderId,
        item.productId,
        item.sellerId,
        item.quantity,
        item.price,
        "Pending"
    ];
});
        const orderItemEntriesData = {
            arrayOfArrays
        }
        
        const orderItemsEntryResult = await orderItemsEntryHelper(orderItemEntriesData)

        if(orderItemsEntryResult.error) {
            return res.status(422).json({
                error: "Error occured while order entry <OI>"
            })
        }

        return res.status(201).json({
    message: "Order Saved successfully",
    orderId: orderId
});


    } catch(error) {
    console.log("ORDER CHECKOUT ERROR =", error);

    return res.status(500).json({
        error: error.message
    });
}
}

async function fetchOrderItemsBySellerId(req, res) {
    const { seller_id } = req.seller_id;
    try {
        const orderItemsBySellerIdResult = await orderItemsBySellerIdHelper({seller_id});
        if(!Array.isArray(orderItemsBySellerIdResult) || orderItemsBySellerIdResult.length === 0) {
            return res.status(404).json({
                error: "No orders found"
            })
        }
        return res.status(200).json({
            orderItemsBySellerIdResult
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
}

// HELPER 

function orderEntryHelper(data) {
    return new Promise((resolve, reject) => {
        Order.addOrder(data, (error, results) => {
            if(error) return reject({
                error: "Error adding data to table\n" + error.message
            });
            return resolve(results);
        });

    
    })
}

function orderItemsEntryHelper(data) {
    return new Promise((resolve, reject) => {
        OrderItems.addOrderItem(data, (error, results) => {
            if(error){
                return reject({
                    error: "Error happened in order items entry\n" + error.message
                });
            } 

            return resolve(results)
        })
    })
}

function orderItemsBySellerIdHelper(data) {
    return new Promise((resolve, reject) => {
        OrderItems.allOrderItemsBySellerId(data, (error, results) => {
            if(error) return reject(error);
            return resolve(results)
        })
    })
}
async function fetchCustomerOrders(req, res) {

  try {

    console.log("MY ORDERS REQUEST");

    console.log(
      "CUSTOMER =",
      req.customer_id
    );

    const customerId =
      req.customer_id &&
      req.customer_id.customer_id;

    if (!customerId) {
      return res.status(401).json({
        error: "Unauthorized. Please login"
      });
    }

    Order.getCustomerOrders(
      customerId,
      (error, results) => {

        if (error) {

          console.log(
            "MY ORDERS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch orders"
          });
        }

        return res.status(200).json({
          orders: results
        });

      }
    );

  } catch (error) {

    console.log(
      "FETCH CUSTOMER ORDERS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}
async function fetchCustomerOrderDetails(req, res) {

  try {

    console.log("ORDER DETAILS REQUEST");

    console.log("CUSTOMER =", req.customer_id);
    console.log("ORDER ID =", req.params.orderId);

    const customerId =
      req.customer_id &&
      req.customer_id.customer_id;

    const orderId = req.params.orderId;

    if (!customerId) {
      return res.status(401).json({
        error: "Unauthorized. Please login"
      });
    }

    if (!orderId) {
      return res.status(400).json({
        error: "Order ID is required"
      });
    }

    Order.getCustomerOrderDetails(
      {
        orderId,
        customerId
      },
      (error, results) => {

        if (error) {

          console.log(
            "ORDER DETAILS ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to fetch order details"
          });
        }

        if (!results || results.length === 0) {

          return res.status(404).json({
            error: "Order not found"
          });
        }

        return res.status(200).json({
          order: results
        });

      }
    );

  } catch (error) {

    console.log(
      "FETCH ORDER DETAILS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}
async function updateDeliveryStatus(req, res) {

  try {

    console.log("UPDATE DELIVERY STATUS REQUEST");

    console.log("SELLER =", req.seller_id);
    console.log("BODY =", req.body);

    const { orderItemId, deliveryStatus } = req.body;

    const sellerId =
      req.seller_id &&
      req.seller_id.seller_id;

    if (!sellerId) {
      return res.status(401).json({
        error: "Unauthorized seller"
      });
    }

    if (!orderItemId || !deliveryStatus) {
      return res.status(400).json({
        error: "Order item ID and delivery status are required"
      });
    }

    const allowedStatuses = [
      "Pending",
      "Shipped",
      "Delivered",
      "Canceled"
    ];

    if (!allowedStatuses.includes(deliveryStatus)) {
      return res.status(400).json({
        error: "Invalid delivery status"
      });
    }

    OrderItems.updateDeliveryStatus(
      {
        deliveryStatus,
        orderItemId,
        sellerId
      },
      (error, result) => {

        if (error) {

          console.log(
            "DELIVERY STATUS UPDATE ERROR =",
            error
          );

          return res.status(500).json({
            error: "Unable to update delivery status"
          });
        }

        console.log(
          "DELIVERY STATUS UPDATE RESULT =",
          result
        );

        if (result.affectedRows === 0) {

          return res.status(404).json({
            error: "Order item not found or does not belong to this seller"
          });
        }

        return res.status(200).json({
          message: "Delivery status updated successfully"
        });

      }
    );

  } catch (error) {

    console.log(
      "UPDATE DELIVERY STATUS ERROR =",
      error
    );

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
}
module.exports = {
  orderCheckout,
  fetchOrderItemsBySellerId,
  fetchCustomerOrders,
  fetchCustomerOrderDetails,
  updateDeliveryStatus
};