const {
  addNewProduct,
  getAllProducts,
  getProductById
} = require("../controllers/productController");
const express = require("express");
const router = express.Router();
const connection = require("../config/db");


// ==========================================
// GET ALL PRODUCTS
// ==========================================
router.get("/all-products/:pageNo", (req, res) => {
    //console.log("PRODUCT ROUTES FILE RUNNING");
    console.log("ALL PRODUCTS API HIT");


    const pageNo = parseInt(req.params.pageNo);

    const offset = (pageNo - 1) * 10;

    const query = `
        SELECT
            p.*,
            pi.image_url
        FROM products p
        LEFT JOIN product_images pi
            ON p.product_id = pi.product_id
            WHERE p.approval_status = 'approved'
        LIMIT ?, 10
    `;

    connection.query(query, [offset], (err, result) => {
        console.log("MYSQL RESULT =", result);
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        // res.json({
        //     totalPages: 1,
        //     pageNo: pageNo,
        //     withSignedImages: result
        // });
//      const products = result.map(product => ({
//     ...product,
//     image_url: product.image_url.startsWith("/sweetsImages")
//         ? product.image_url
//         : `http://localhost:5005/uploads/${product.image_url}`
// }));
const products = result.map(product => ({
  ...product,
  image_url: product.image_url.startsWith("/sweetsImages")
      ? product.image_url
      : `${req.protocol}://${req.get("host")}/uploads/${product.image_url}`
}));
console.log(result)
res.json({
    totalPages: 1,
    pageNo,
    withSignedImages: products
});
    });

});


// ==========================================
// GET PRODUCT DETAILS
// ==========================================
router.get("/product/detail/:productId", (req, res) => {

    const productId = req.params.productId;

    const query = `
        SELECT
            p.product_id,
            p.product_name,
            p.product_description,
            p.category,
            p.price,
            p.category_type,
            p.seller_id,

            s.business_name,

            a.city,
            a.country,

            pi.image_url

        FROM products p

        LEFT JOIN seller s
            ON p.seller_id = s.seller_id

        LEFT JOIN seller_store_address a
            ON s.seller_id = a.seller_id

        LEFT JOIN product_images pi
            ON p.product_id = pi.product_id

        WHERE p.product_id = ?
    `;

    connection.query(query, [productId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        const row = result[0];

        res.json({
            completeProductDetails: {
                productId: row.product_id,
                sellerId: row.seller_id,
                productName: row.product_name,
                productDescription: row.product_description,
                category: row.category,
                price: row.price,
                categoryType: row.category_type,
                businessName: row.business_name,
                city: row.city,
                country: row.country,
                signerUrl: row.image_url
            }
        });

    });

});

module.exports = router;