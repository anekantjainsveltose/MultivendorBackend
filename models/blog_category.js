const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newblogSchema = new Schema(
    {
        cate_title:{
            type: String,
        },
        cate_img:{
            type: String,
        },
        cate_desc:{
            type: String,
        },
        cate_type:{
            type: String,
        }
    },
    {timestamps: true},
)


module.exports = mongoose.model("blog_category", newblogSchema);