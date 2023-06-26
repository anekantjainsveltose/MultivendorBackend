const express = require("express");
const app = express();
const cors = require("cors");
const AWS = require("aws-sdk");

require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const user = require("./routes/user");
const adminlogin = require("./routes/adminlogin");
const aboutus = require("./routes/aboutus");
const seller = require("./routes/seller");
const category = require("./routes/category");
const subcategory = require("./routes/sub_category");
const brands = require("./routes/brand");
const units = require("./routes/units");
const product = require("./routes/product");
const child_category = require("./routes/child_category");
const language = require("./routes/language");
const color = require("./routes/color");
const size = require("./routes/size");
const addbatch = require("./routes/add_batch");
const country_code = require("./routes/country_code");
const banner = require("./routes/banner");
const create_hub = require("./routes/create_hub");
const order = require("./routes/order");
const shop_wishlist = require("./routes/shop_wishlist");
const shop_cart = require("./routes/shop_cart");
const blog = require("./routes/blog");
const wallet = require("./routes/wallet");
const assing_drive = require("./routes/assing_drive");
const vendor = require("./routes/vendor");
const attribute = require("./routes/attribute");
const selse = require("./routes/selse");
const pincode = require("./routes/pincode");
const vehicle = require("./routes/vehicle");
const coupon_code = require("./routes/coupon_code");
const leave_comment = require("./routes/leave_comment");
const refundrequest = require("./routes/refundrequest");
const subscription = require("./routes/subscription");
const trending = require("./routes/trending");
const privacypolicy = require("./routes/privacypolicy");
const Termsandcondition = require("./routes/Termsandcondition");
const assingvender = require("./routes/assingvender");
const deal_of_day = require("./routes/deal_of_day");
const review_rating = require("./routes/review_rating");
const return_product = require("./routes/return_product");
// const assingdata = require("./routes/assingdata");
const blog_category = require("./routes/blog_category");

//app all api

const appuser = require("./routes/appuser");
const addgroup = require("./routes/addgroup");
// const app_driver = require("./routes/app_driver");
const hot_deals = require("./routes/hot_deals");

app.use("/", user);
app.use("/", adminlogin);
app.use("/", aboutus);
app.use("/", seller);
app.use("/", category);
app.use("/", subcategory);
app.use("/", brands);
app.use("/", units);
app.use("/", child_category);
app.use("/", product);
app.use("/", language);
app.use("/", color);
app.use("/", size);
app.use("/", addbatch);
app.use("/", country_code);
app.use("/", banner);
app.use("/", create_hub);
app.use("/", order);
app.use("/", shop_wishlist);
app.use("/", shop_cart);
app.use("/", blog);
app.use("/", wallet);
app.use("/", assing_drive);
app.use("/", vendor);
app.use("/", attribute);
app.use("/", selse);
app.use("/", pincode);
app.use("/", vehicle);
app.use("/", coupon_code);
app.use("/", leave_comment);
app.use("/", refundrequest);
app.use("/", subscription);
app.use("/", trending);
app.use("/", privacypolicy);
app.use("/", Termsandcondition);
// app.use('/', assingdata);
app.use("/", assingvender);
app.use("/", deal_of_day);
app.use("/", return_product);
app.use("/", review_rating);
app.use("/", blog_category);

// app user api

app.use("/", appuser);
app.use("/", addgroup);
// app.use('/', app_driver);
app.use("/", hot_deals);

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.listen(process.env.PORT || 8000, () => {
  console.log(process.env.DATABASE);
  console.log(`Example app listening on port ${process.env.PORT || 8000}`);
});
