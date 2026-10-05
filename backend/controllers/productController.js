const { Products, ProductImage } = require("../models/productModel");
const { Seller } = require("../models/sellerModel");
//const { getSignedDownloadUrl, s3Uploader } = require("../signer/signer");

const { v4: uuidv4 } = require("uuid");

async function getAllProducts(req, res) {
  //console.log(withSignedImages);
  const pageNo = req.params.pageNo;
  try {
    const result = await allProduct({pageNo}); // this will contain the image information including image path
    
    if(!result) {
      return res.status(404).json({
        error: "No product find"
      })
    }
    const imagePromises = result.map(async (product) => ({
      ...product,
      image_url: product.image_url.startsWith("/sweetsImages/")
  ? product.image_url
  : `${req.protocol}://${req.get("host")}/uploads/${product.image_url}`,

      // image_url: product.image_url,
      //image_url: await getSignedDownloadUrl(product.image_url), // this will grab the image path and make it
      // a presigned url
    }));
    const withSignedImages = await Promise.all(imagePromises);
    console.log(withSignedImages);
    const totalRowsResult = await totalRowsCount();
    if (!Array.isArray(totalRowsResult) || totalRowsResult.length === 0) {
      return res.status(404).json({
        error: "No Products found",
      });
    }

    const [{ totalRows }] = totalRowsResult;

    return res.status(200).json({
      totalPages: Math.ceil(totalRows / 10),
      pageNo,
      withSignedImages
    });
   }// catch (error) {
  //   res.status(500).json({
  //     error: "Something went wrong",
  //   });

  //}
  catch (error) {
  console.log("GET ALL PRODUCTS ERROR:");
  console.log(error);

  res.status(500).json({
    error: error.message || String(error),
  });
}
}

async function getProductById(req, res) {
  console.log("PRODUCT CONTROLLER RUNNING");
  const incomingProductId = req.params.productId;
  try {
    // fetch Product details from the products table
    const productByIdResults = await productByIdHelper({ incomingProductId });
    if (Array.isArray(productByIdResults) && productByIdResults.length > 0) {
      // fetch seller details from the seller table join seller_store_address table
      const [
        {
          product_id: productId,
          seller_id: sellerId,
          product_name: productName,
          product_description: productDescription,
          category,
          price,
          category_type: categoryType,
          imageKey
        },
      ] = productByIdResults;
      //const signerUrl = await getSignedDownloadUrl(imageKey)
      const signerUrl = imageKey;
      const sellerByIdResults = await sellerByIdHelper({ sellerId });
      if (Array.isArray(sellerByIdResults) && sellerByIdResults.length > 0) {
        const [{ businessName, city, country }] = sellerByIdResults;
        const completeProductDetails = {
          productId,
          sellerId,
          productName,
          productDescription,
          category,
          price,
          categoryType,
          businessName,
          city,
          country,
          signerUrl
        };
        

        return res.status(200).json({
            completeProductDetails
        })
      } else {
        return res.status(404).json({
          error: "Something went wrong",
        });
      }
    } else {
      return res.status(404).json({
        error: "Product not found",
      });
    }
  } catch (error) {
    console.log("Server error", error);
  }
}

async function addNewProduct(req, res) {
  try {
    const productData = req.body;
    const { seller_id } = req.seller_id;
    console.log("seller_id: " + seller_id);
    const productFileObj = req.file;
    console.log("FILE DATA =", req.file);
    
    //const productImageName = productFileObj.filename;
    const productImageName = productFileObj.filename;
    const productId = uuidv4();
    const modifiedProductData = {
      productId,
      seller_id,
      ...productData,
    };

    const productsTableResults = await productsTableResultsHelper(
      modifiedProductData
    );
    if (
      !productsTableResults.error &&
      productsTableResults.affectedRows === 1
    ) {
      //const responseFromS3 = await s3Uploader(productFileObj);
      const responseFromS3 = { error: false };
      if (!responseFromS3.error) {
        const imageId = uuidv4();

        const modifiedImageData = {
          imageId,
          productId,
          productImageName,
        };
        const productImagesTableResults = await productImagesTableResultsHelper(
          modifiedImageData
        );
        if (
          !productImagesTableResults.error &&
          productImagesTableResults.affectedRows === 1
        ) {
          return res.status(201).json({
            message: "Product Request fulfilled successfully",
          });
        } else {
          return res.status(409).json({
            error: "Product Request I failed. Try again after some time",
          });
        }
      } else {
        return res.status(502).json({
          error: "Request Failed. Try again after some time",
        });
      }
    } else {
      return res.status(409).json({
        error: "Product Request failed. Try again after some time",
      });
    }
  } catch (error) {
    console.log("ADD PRODUCT ERROR:");
  console.log(error);
    return res.status(500).json({
      error: error.message || String(error),
    });
  }
}

// HELPER FUNCTIONS

function totalRowsCount() {
  return new Promise((resolve, reject) => {
    Products.totalCount((error, results) => {
      if (error) {
        return reject({
          error: error,
        });
      }
      return resolve(results);
    });
  });
}

function allProduct(data) {
  // Something new here. We have chosed to return a Promise itself which will be resolved. or rejected
  // The allProduct() will run the query and return the result here.
  return new Promise((resolve, reject) => {
    Products.allProducts(data,(error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
}

function productsTableResultsHelper(modifiedProductData) {
  return new Promise((resolve, reject) => {
    Products.newProduct(modifiedProductData, (error, results) => {
      if (error)
        reject({
          error: error.message,
        });
      resolve(results);
    });
  });
}

function productImagesTableResultsHelper(modifiedImageData) {
  return new Promise((resolve, reject) => {
    ProductImage.addNewImage(modifiedImageData, (error, results) => {
      if (error)
        reject({
          error: error.message,
        });
      resolve(results);
    });
  });
}

function productByIdHelper(data) {
  return new Promise((resolve, reject) => {
    Products.oneProduct(data, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

function sellerByIdHelper(data) {
  return new Promise((resolve, reject) => {
    Seller.sellerById(data, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
