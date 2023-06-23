const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DealOfDaySchema = new Schema(
    {
        title:{
            type: String,
        },
        desc:{
            type: String,
        },
        status:{
            type: String,
            default: "Active",
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"products",
        },
        start_date:{
            type:String
        },
        end_date:{
            type:String
        }
    },
    {timestamps: true}
);


module.exports = mongoose.model("dealofday", DealOfDaySchema)