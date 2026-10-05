const  connection = require("../config/db");
const Order = {
  addOrder: (data, callback) => {
    const query = `
            INSERT INTO orders (
                order_id, customer_id, total_amount
            ) VALUES (
                ?,?,? 
            )
        `;
    const { orderId, customerId, totalAmount } = data;
    connection.query(query, [orderId, customerId, totalAmount], callback);
  },
  updateRazorpayOrderId: (data, callback) => {

    const query = `
        UPDATE orders
        SET razorpay_order_id = ?
        WHERE order_id = ?
    `;

    const {
        razorpayOrderId,
        orderId
    } = data;

    connection.query(
        query,
        [razorpayOrderId, orderId],
        callback
    );
},

markOrderAsPaid: (razorpayOrderId, callback) => {

    const query = `
        UPDATE orders
        SET payment_status = 'Paid'
        WHERE razorpay_order_id = ?
    `;

    connection.query(
        query,
        [razorpayOrderId],
        callback
    );
},
getCustomerOrders: (customerId, callback) => {
  const query = `
    SELECT
      order_id,
      order_date,
      payment_status,
      total_amount,
      razorpay_order_id
    FROM orders
    WHERE customer_id = ?
    ORDER BY order_date DESC
  `;

  connection.query(query, [customerId], callback);
},

getCustomerOrderDetails: (data, callback) => {
  const query = `
    SELECT
      o.order_id,
      o.order_date,
      o.payment_status,
      o.total_amount,

      oi.order_item_id,
      oi.product_id,
      oi.seller_id,
      oi.quantity,
      oi.item_price,
      oi.total_price,
      oi.delivery_status,

      p.product_name

    FROM orders o

    INNER JOIN order_items oi
      ON o.order_id = oi.order_id

    LEFT JOIN products p
      ON oi.product_id = p.product_id

    WHERE o.order_id = ?
      AND o.customer_id = ?

    ORDER BY oi.order_item_id
  `;

  const { orderId, customerId } = data;

  connection.query(
    query,
    [orderId, customerId],
    callback
  );
},
};



const OrderItems = {
  addOrderItem: (data, callback) => {

    const query = `
      INSERT INTO order_items (
        order_item_id,
        order_id,
        product_id,
        seller_id,
        quantity,
        item_price,
        delivery_status
      ) VALUES ?
    `;

    const { arrayOfArrays } = data;

    connection.query(query, [arrayOfArrays], callback);
  },

  allOrderItemsBySellerId: (data, callback) => {

    const query = `
      SELECT * FROM order_items WHERE seller_id=?
    `;

    const { seller_id } = data;

    connection.query(query, [seller_id], callback);
  },
  updateDeliveryStatus: (data, callback) => {

  const query = `
    UPDATE order_items
    SET
      delivery_status = ?,
      delivery_date =
        CASE
          WHEN ? = 'Delivered'
          THEN CURRENT_TIMESTAMP
          ELSE delivery_date
        END
    WHERE order_item_id = ?
      AND seller_id = ?
  `;

  const {
    deliveryStatus,
    orderItemId,
    sellerId
  } = data;

  connection.query(
    query,
    [
      deliveryStatus,
      deliveryStatus,
      orderItemId,
      sellerId
    ],
    callback
  );
},
};

module.exports = {
  Order,
  OrderItems,
};
