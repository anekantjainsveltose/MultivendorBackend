const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategoryschema = new Schema(
  {
    subcategory_name: {
      type: String,
    },
    image: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
      default: "Active",
    },
    thumbnail_img: {
      type: Array,
    },
    webbanner: {
      type: Array,
    },
    app_banner: {
      type: Array,
    },
    type: {
      type: String,
    },
    feature: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subproductcategories", Subcategoryschema);
