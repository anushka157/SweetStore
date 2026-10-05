const express = require("express");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const deliveryPartnerRoutes =
  require("./routes/deliveryPartnerRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", sellerRoutes);
app.use("/", orderRoutes);
app.use("/", paymentRoutes);
app.use("/", adminRoutes);
app.use("/", reviewRoutes);
app.use("/", deliveryPartnerRoutes);
// app.listen(5005, () => {
//     console.log("Server running on port 5005");
// });


const PORT = process.env.PORT || 5005;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});