const connection = require("../config/db");

const Products = {
  sampleFunction: (callback) => {
    connection.query("DESCRIBE products", callback);
  },

  totalCount: (callback) => {
    const query = `
      SELECT COUNT(*) AS totalRows
      FROM products
    `;
    connection.query(query, callback);
  },

  // Fetch all approved products for customer Home
  allProducts: (data, callback) => {
    const query = `
      SELECT
        pi.image_url,
        pd.product_id,
        pd.product_name,
        pd.product_description,
        pd.price,
        pd.seller_id
      FROM products pd
      INNER JOIN product_images pi
        ON pd.product_id = pi.product_id
      WHERE pd.approval_status = "approved"
      LIMIT ?, ?
    `;

    const { pageNo } = data;
    const offset = (pageNo - 1) * 10;

    connection.query(query, [offset, 10], callback);
  },

  // Fetch one product with image
  oneProduct: (data, callback) => {
    const query = `
      SELECT
        pi.image_url AS imageKey,
        pd.product_id,
        pd.product_name AS product_name,
        pd.product_description AS product_description,
        pd.category AS category,
        pd.price AS price,
        pd.category_type AS category_type,
        pd.seller_id AS seller_id
      FROM products pd
      INNER JOIN product_images pi
        ON pd.product_id = pi.product_id
      WHERE pd.product_id = ?
    `;

    const { incomingProductId } = data;

    connection.query(query, [incomingProductId], callback);
  },

  // Fetch products belonging to logged-in seller WITH IMAGE
  allProductsBySellerId: (data, callback) => {
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

    connection.query(query, [seller_id], callback);
  },

  newProduct: (data, callback) => {
    const query = `
      INSERT INTO products (
        product_id,
        product_name,
        product_description,
        category,
        stock,
        seller_id,
        price,
        category_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      productId,
      productName,
      productDescription,
      category,
      stock,
      seller_id,
      price,
      categoryType,
    } = data;

    connection.query(
      query,
      [
        productId,
        productName,
        productDescription,
        category,
        stock,
        seller_id,
        price,
        categoryType,
      ],
      callback
    );
  },
};

const ProductImage = {
  addNewImage: (data, callback) => {
    const query = `
      INSERT INTO product_images (
        image_id,
        product_id,
        image_url
      )
      VALUES (?, ?, ?)
    `;

    const {
      imageId,
      productId,
      productImageName,
    } = data;

    connection.query(
      query,
      [imageId, productId, productImageName],
      callback
    );
  },
};

module.exports = {
  Products,
  ProductImage,
};