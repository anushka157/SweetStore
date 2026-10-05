const connection = require("../config/db");

const DeliveryPartner = {

  // ==========================================
  // ADD DELIVERY PARTNER
  // ==========================================

  addDeliveryPartner: (data, callback) => {

    const query = `
      INSERT INTO delivery_partner (
        delivery_partner_id,
        registered_user_id,
        name,
        phone_number,
        approval_status
      )
      VALUES (?, ?, ?, ?, 'pending')
    `;

    const {
      deliveryPartnerId,
      registeredUserId,
      name,
      phoneNumber,
    } = data;

    connection.query(
      query,
      [
        deliveryPartnerId,
        registeredUserId,
        name,
        phoneNumber,
      ],
      callback
    );
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
      AND delivery_partner_id = ?
  `;

  const {
    deliveryStatus,
    orderItemId,
    deliveryPartnerId,
  } = data;

  connection.query(
    query,
    [
      deliveryStatus,
      deliveryStatus,
      orderItemId,
      deliveryPartnerId,
    ],
    callback
  );
},
  // ==========================================
  // GET DELIVERY PARTNER BY USER ID
  // ==========================================

  getDeliveryPartnerByUserId: (userId, callback) => {

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
      WHERE dp.registered_user_id = ?
    `;

    connection.query(
      query,
      [userId],
      callback
    );
  },


  // ==========================================
  // LOGIN
  // ==========================================

  deliveryPartnerLogin: (email, callback) => {

    const query = `
      SELECT
        u.user_id,
        u.email,
        u.password,
        u.role,
        dp.delivery_partner_id,
        dp.approval_status
      FROM user u
      INNER JOIN delivery_partner dp
        ON u.user_id = dp.registered_user_id
      WHERE u.email = ?
        AND u.role = 'delivery_partner'
    `;

    connection.query(
      query,
      [email],
      callback
    );
  },


  // ==========================================
  // GET PENDING DELIVERY PARTNERS
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

    connection.query(
      query,
      callback
    );
  },


  // ==========================================
  // APPROVE
  // ==========================================

  approveDeliveryPartner: (deliveryPartnerId, callback) => {

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

getAssignedOrders: (deliveryPartnerId, callback) => {
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
      o.order_date,
      o.payment_status,
      p.product_name
    FROM order_items oi
    INNER JOIN orders o
      ON oi.order_id = o.order_id
    LEFT JOIN products p
      ON oi.product_id = p.product_id
    WHERE oi.delivery_partner_id = ?
    ORDER BY o.order_date DESC
  `;

  connection.query(
    query,
    [deliveryPartnerId],
    callback
  );
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
      AND delivery_partner_id = ?
  `;

  const {
    deliveryStatus,
    orderItemId,
    deliveryPartnerId,
  } = data;

  connection.query(
    query,
    [
      deliveryStatus,
      deliveryStatus,
      orderItemId,
      deliveryPartnerId,
    ],
    callback
  );
},
  // ==========================================
  // REJECT
  // ==========================================

  rejectDeliveryPartner: (deliveryPartnerId, callback) => {

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
  DeliveryPartner,
};