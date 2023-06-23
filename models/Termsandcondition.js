const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newterm_schema = new Schema(
    {
        description: {
            type: String,
        },
    },
    {timestamps: true},
)
module.exports = mongoose.model("termsandcondition", newterm_schema)