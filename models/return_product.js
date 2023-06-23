const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderproduct'
  },
  reason_for_return:{
    type: String,
  },
  comments:{
    type: String,
  },
},
{ timestamps: true }
);
 module.exports = mongoose.model("return_product", reviewSchema);


 