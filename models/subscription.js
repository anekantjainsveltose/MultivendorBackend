const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsubscriptionSchema = new Schema(
    {
        customerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        vender_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "appvender",
        },
        group_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "vender_group",
        },
        quantity:{
            type: String,
        },
        date_add:{
            type: String,
        },
        subscribed_product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        validity:{
            type: String,
        },
        status:{
            type: String,
            default: "Deactive",
        },
    },
    {timeseries: true},
)

module.exports = mongoose.model("subscription", newsubscriptionSchema);