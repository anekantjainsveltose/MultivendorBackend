const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appuserSchema = new Schema(
  
  {
    customerId:{
      type: Array,
    },
    group_name:{
      type: String,
    },
    active_group:{
      type: String,
      default: "active",
    },
    email:{
      type: String,
    },
    mobile: {
      type: Number,
    },
    name: {
      type: String,
    },
    door_number: {
      type: String,
    },
    street: {
      type: String,
    },
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    service_location: {
      type: String,
    },
    service_city: {
      type: String,
    },
    service_pincode: {
      type: Number,
    },
    vendoor_img: {
      type: Array,
    },
    adhar_no: {
      type: Number,
    },
    adhar_img_front: {
      type: Array,
    },
    adhar_img_back: {
      type: Array,
    },
    pancard_no: {
      type: String,
    },
    pancard_img_front: {
      type: Array,
    },
    pancard_img_back: {
      type: Array,
    },
    account_no: {
      type: Number,
    },
    cus_name: {
      type: String,
    },
    branch: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
    passbook_img: {
      type: Array,
    },
    otp: {
      type: Number,
    },
    status: {
      type: String,
      default: "false",
    },
   
  },
  { timestamps: true }
)

module.exports = mongoose.model("appvender", appuserSchema);