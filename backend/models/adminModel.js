
const connection = require("../config/db");

const Admin = {

  // ==========================================
  // PRODUCTS
  // ==========================================

  getPendingProducts: (callback) => {
    const query = `
      SELECT
        p.product_id,
        p.product_name,
        p.product_description,
        p.category,
        p.category_type,
        p.price,
        p.stock,
        p.seller_id,
        p.approval_status,
        p.created_at
      FROM products p
      WHERE p.approval_status = 'pending'
      ORDER BY p.created_at DESC
    `;

    connection.query(query, callback);
  },


// ==========================================
// ALL ORDERS
// ==========================================

getAllOrders: (callback) => {

  const query = `
    SELECT
      o.order_id,
      o.customer_id,
      o.order_date,
      o.payment_status,
      o.total_amount,
      o.razorpay_order_id,

      oi.order_item_id,
      oi.product_id,
      oi.seller_id,
      oi.quantity,
      oi.item_price,
      oi.total_price,
      oi.delivery_status,
      oi.delivery_partner_id,

      p.product_name,

      s.business_name AS seller_name,

      dp.name AS delivery_partner_name,
      dp.phone_number AS delivery_partner_phone

    FROM orders o

    INNER JOIN order_items oi
      ON o.order_id = oi.order_id

    LEFT JOIN products p
      ON oi.product_id = p.product_id

    LEFT JOIN seller s
      ON oi.seller_id = s.seller_id

    LEFT JOIN delivery_partner dp
      ON oi.delivery_partner_id = dp.delivery_partner_id

    ORDER BY o.order_date DESC
  `;

  connection.query(query, callback);
},


  getProductDetails: (productId, callback) => {
  const query = `
    SELECT
      p.product_id,
      p.product_name,
      p.product_description,
      p.category,
      p.category_type,
      p.price,
      p.stock,
      p.seller_id,
      p.approval_status,
      p.created_at,
      p.updated_at,
      s.business_name AS seller_name,
      s.phone_number AS seller_phone,
      pi.image_url
    FROM products p
    INNER JOIN seller s
      ON p.seller_id = s.seller_id
    LEFT JOIN product_images pi
      ON p.product_id = pi.product_id
    WHERE p.product_id = ?
  `;

  connection.query(query, [productId], callback);
},
  // ==========================================
// ALL SELLER PRODUCTS
// ==========================================

getAllSellerProducts: (callback) => {
  const query = `
    SELECT
      p.product_id,
      p.product_name,
      p.product_description,
      p.category,
      p.category_type,
      p.price,
      p.stock,
      p.seller_id,
      p.approval_status,
      p.created_at,
      s.business_name AS seller_name,
      s.phone_number AS seller_phone
    FROM products p
    INNER JOIN seller s
      ON p.seller_id = s.seller_id
    ORDER BY p.created_at DESC
  `;

  connection.query(query, callback);
},
  approveProduct: (productId, callback) => {
    const query = `
      UPDATE products
      SET approval_status = 'approved'
      WHERE product_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(query, [productId], callback);
  },

  rejectProduct: (productId, callback) => {
    const query = `
      UPDATE products
      SET approval_status = 'rejected'
      WHERE product_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(query, [productId], callback);
  },

   assignDeliveryPartner: (
  orderItemId,
  deliveryPartnerId,
  callback
) => {

  const query = `
    UPDATE order_items
    SET
      delivery_partner_id = ?,
      delivery_status = 'Assigned'
    WHERE order_item_id = ?
  `;

  connection.query(
    query,
    [
      deliveryPartnerId,
      orderItemId,
    ],
    callback
  );
},

getUnassignedOrders: (callback) => {

  const query = `
    SELECT
      oi.order_item_id,
      oi.order_id,
      oi.product_id,
      oi.seller_id,
      oi.quantity,
      oi.item_price,
      oi.total_price,
      oi.delivery_status,
      oi.delivery_partner_id,
      p.product_name,
      dp.name AS delivery_partner_name
    FROM order_items oi

    LEFT JOIN products p
      ON oi.product_id = p.product_id

    LEFT JOIN delivery_partner dp
      ON oi.delivery_partner_id =
         dp.delivery_partner_id

    ORDER BY oi.order_id DESC
  `;

  connection.query(
    query,
    callback
);
},
  // ==========================================
  // SELLERS
  // ==========================================

  getPendingSellers: (callback) => {
    const query = `
      SELECT
        s.seller_id,
        s.registered_user_id,
        s.business_name,
        s.phone_number,
        s.approval_status,
        a.address_line_1,
        a.address_line_2,
        a.city,
        a.country,
        a.zip_code
      FROM seller s
      LEFT JOIN seller_store_address a
        ON s.seller_id = a.seller_id
      WHERE s.approval_status = 'pending'
      ORDER BY s.seller_id DESC
    `;

    connection.query(query, callback);
  },

  approveSeller: (sellerId, callback) => {
    const query = `
      UPDATE seller
      SET approval_status = 'approved'
      WHERE seller_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(query, [sellerId], callback);
  },

  rejectSeller: (sellerId, callback) => {
    const query = `
      UPDATE seller
      SET approval_status = 'rejected'
      WHERE seller_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(query, [sellerId], callback);
  },


  // ==========================================
  // DELIVERY PARTNERS
  // ==========================================

  getPendingDeliveryPartners: (callback) => {

    const query = `
      SELECT
        dp.delivery_partner_id,
        dp.registered_user_id,
        dp.name,
        dp.phone_number,
        dp.approval_status,
        u.email
      FROM delivery_partner dp
      INNER JOIN user u
        ON dp.registered_user_id = u.user_id
      WHERE dp.approval_status = 'pending'
      ORDER BY dp.delivery_partner_id DESC
    `;

    connection.query(query, callback);
  },


  approveDeliveryPartner: (
    deliveryPartnerId,
    callback
  ) => {

    const query = `
      UPDATE delivery_partner
      SET approval_status = 'approved'
      WHERE delivery_partner_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(
      query,
      [deliveryPartnerId],
      callback
    );
  },


  rejectDeliveryPartner: (
    deliveryPartnerId,
    callback
  ) => {

    const query = `
      UPDATE delivery_partner
      SET approval_status = 'rejected'
      WHERE delivery_partner_id = ?
        AND approval_status = 'pending'
    `;

    connection.query(
      query,
      [deliveryPartnerId],
      callback
    );
  },

};

module.exports = {
  Admin,
};