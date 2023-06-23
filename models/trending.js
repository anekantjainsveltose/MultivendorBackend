const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trending_schema = new Schema(
{   
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
    },
    // status:{
    //     type:String,
    //     default:"Active",
    // },
},
{timestamps:true}

);



module.exports = mongoose.model("trending", trending_schema);
