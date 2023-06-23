const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newattributeSchema = new Schema(
    {
        size:{
            type: String,
        },
        type:{
            type: String,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("attribute", newattributeSchema)