const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
   
    category_name: {
        type: String,
    },
    
    parent:{
      type: String,
    },
    image:{
       type: Array,
    },
    thumbnail_img:{
      type: Array,
    },
    web_banner:{
      type: Array,
    },
    app_banner:{
      type: Array,
    },
    type:{
      type: String,
    },
   
    feature:{
      type: String,
    },
    status:{
        type:String,
        default: "Enable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
