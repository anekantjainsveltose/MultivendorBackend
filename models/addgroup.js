const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addgroup = new Schema(
  
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
   
  },
  { timestamps: true }
)

module.exports = mongoose.model("vender_group", addgroup);