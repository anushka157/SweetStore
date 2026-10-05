const connection = require("../config/db");

const Seller = {

  // =====================================================
  // SELLER PROFILE
  // =====================================================

  sellerProfile: (data, callback) => {
    const query = `
      SELECT *
      FROM seller
      WHERE registered_user_id = ?
    `;

    const { registeredUserId } = data;

    connection.query(
      query,
      [registeredUserId],
      callback
    );
  },

  // =====================================================
  // ADD SELLER
  // =====================================================

  addSeller: (data, callback) => {
    const query = `
      INSERT INTO seller (
        seller_id,
        registered_user_id,
        business_name,
        phone_number
      )
      VALUES (?, ?, ?, ?)
    `;

    const {
      sellerId,
      registeredUserId,
      businessName,
      phoneNumber,
    } = data;

    connection.query(
      query,
      [
        sellerId,
        registeredUserId,
        businessName,
        phoneNumber,
      ],
      callback
    );
  },

  // =====================================================
  // SELLER BY ID
  // =====================================================

  sellerById: (data, callback) => {
    const query = `
      SELECT
        sl.business_name AS businessName,
        sl.phone_number AS phoneNumber,
        sladd.address_line_1 AS addressLineOne,
        sladd.address_line_2 AS addressLineTwo,
        sladd.city AS city,
        sladd.country AS country,
        sladd.zip_code AS zipCode
      FROM seller sl
      LEFT JOIN seller_store_address sladd
        ON sl.seller_id = sladd.seller_id
      WHERE sl.seller_id = ?
    `;

    const { sellerId } = data;

    connection.query(
      query,
      [sellerId],
      callback
    );
  },

  // =====================================================
  // UPDATE SELLER PROFILE
  // =====================================================

  updateSellerProfile: (data, callback) => {
    const query = `
      UPDATE seller
      SET
        business_name = ?,
        phone_number = ?
      WHERE seller_id = ?
    `;

    const {
      sellerId,
      businessName,
      phoneNumber,
    } = data;

    connection.query(
      query,
      [
        businessName,
        phoneNumber,
        sellerId,
      ],
      callback
    );
  },

  // =====================================================
  // GET ALL PRODUCTS BY SELLER
  // =====================================================

  allproductBySellerId: (data, callback) => {
    const query = `
      SELECT
        pd.product_id,
        pd.product_name,
        pd.product_description,
        pd.category,
        pd.category_type,
        pd.price,
        pd.approval_status,
        pd.created_at,
        pd.updated_at,
        pd.stock,
        pd.seller_id,
        pi.image_url
      FROM products pd
      LEFT JOIN product_images pi
        ON pd.product_id = pi.product_id
      WHERE pd.seller_id = ?
      ORDER BY pd.created_at DESC
    `;

    const { seller_id } = data;

    connection.query(
      query,
      [seller_id],
      callback
    );
  },

  // =====================================================
  // DELETE SELLER PRODUCT
  // =====================================================

deleteProduct: (data, callback) => {
  const { productId, sellerId } = data;

  // First delete product images
  const deleteImagesQuery = `
    DELETE FROM product_images
    WHERE product_id = ?
  `;

  connection.query(
    deleteImagesQuery,
    [productId],
    (imageError) => {
      if (imageError) {
        console.log("DELETE PRODUCT IMAGES ERROR =", imageError);
        return callback(imageError);
      }

      // Then delete the product
      const deleteProductQuery = `
        DELETE FROM products
        WHERE product_id = ?
          AND seller_id = ?
      `;

      connection.query(
        deleteProductQuery,
        [productId, sellerId],
        callback
      );
    }
  );
},
};

// =====================================================
// SELLER STORE ADDRESS
// =====================================================

const SellerStoreAddress = {

  // =====================================================
  // ADD SELLER ADDRESS
  // =====================================================

  addSellerStoreAddress: (
    data,
    callback
  ) => {

    const query = `
      INSERT INTO seller_store_address (
        seller_address_id,
        seller_id,
        address_line_1,
        address_line_2,
        city,
        country,
        zip_code
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      sellerAddressId,
      sellerId,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    } = data;

    connection.query(
      query,
      [
        sellerAddressId,
        sellerId,
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
      ],
      callback
    );
  },

  // =====================================================
  // UPDATE SELLER ADDRESS
  // =====================================================

  updateSellerStoreAddress: (
    data,
    callback
  ) => {

    const query = `
      UPDATE seller_store_address
      SET
        address_line_1 = ?,
        address_line_2 = ?,
        city = ?,
        country = ?,
        zip_code = ?
      WHERE seller_id = ?
    `;

    const {
      sellerId,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    } = data;

    connection.query(
      query,
      [
        addressLine1,
        addressLine2,
        city,
        country,
        zipCode,
        sellerId,
      ],
      callback
    );
  },
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  Seller,
  SellerStoreAddress,
};