const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privacypolicySchema= new Schema(
    {
        description:{
            type: String, 
        },
    },
    {timestamps: true},
);


module.exports = mongoose.model("privacypolicy", privacypolicySchema)