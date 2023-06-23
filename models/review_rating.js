const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"products",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },

  comment:{
      type : String
},
avg_rating:{
  type: Number,
},
 
reply:{
  type: String,
},
// count:{
//     type: Number,   
//     default:0
// }

},
{ timestamps: true }
);
 module.exports = mongoose.model("review", reviewSchema);


 