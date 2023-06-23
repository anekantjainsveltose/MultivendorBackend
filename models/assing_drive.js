const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assingSchema = new Schema(
    {
        orderdata: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderproduct",
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        identity_type: {
            type: String,
        },
        // identity_no: {
        //     type: String,
        // },
        identity_img: {
            type: Array,
        },
        phone_no: {
            type: String,
        },
        address: {
            type: String,
        },
        adhar_card_img: {
            type: Array,
        },

driver_img:{
    type: Array,
},
        // driverImg: {
        //     type: Array,
        // },
        email: {
            type: String,
        },
        oldpassword: {
            type: String,
        },
        password: {
            type: String,
        },
        cnfrmPassword: {
            type: String,
        },
        status: {
            type: String,
            default: "false"
        },
        regis_cardImg: {
            type: Array,
        },
        insuranceImg: {
            type: Array,
        },
        licenseImg: {
            type: Array,
        },


    },
    { timestamps: true },
);
module.exports = mongoose.model("drive", assingSchema);