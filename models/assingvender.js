const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newvenderSchema = new Schema(
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products",
        },
        venderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"appvender",
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("assingedvender", newvenderSchema)