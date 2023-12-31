const products = require("../models/product");
const subproductcategories = require("../models/sub_category");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

exports.addproduct = async (req, res) => {
  const {
    product_name,
    description,
    type,
    brand,
    model,
    quantity,
    gst_class,
    min_selling_Q,
    max_selling_Q,
    reward_points,
    product_image,
    video_url,
    metadata,
    meta_desc,
    product_search_tags,
    category,
    sub_category,
    mrp,
    buying_price,
    m_margin,
    buying_price1,
    m_margin1,
    selling_price,
    units_name,
    m_customer,
    save_parsent,
    stock,
    color,
    size,
    status,
    bundle,
    fix_price,
  } = req.body;

  const newproducts = new products({
    product_name: product_name,
    description: description,
    type: type,
    brand: brand,
    model: model,
    quantity: quantity,
    gst_class: gst_class,
    min_selling_Q: min_selling_Q,
    max_selling_Q: max_selling_Q,
    reward_points: reward_points,
    product_image: product_image,
    video_url: video_url,
    metadata: metadata,
    meta_desc: meta_desc,
    product_search_tags: product_search_tags,
    category: category,
    sub_category: sub_category,
    mrp: mrp,
    buying_price: buying_price,
    m_margin: m_margin,
    m_customer: m_customer,
    selling_price: selling_price,
    save_parsent: save_parsent,
    units_name: units_name,
    stock: stock,
    color: color,
    size: size,
    buying_price1: buying_price1,
    m_margin1: m_margin1,
    status: status,
    bundle: bundle,
    fix_price: fix_price,
  });

  const findexist = await products.findOne({ product_name: product_name });
  if (findexist) {
    res.status(403).json({
      status: false,
      msg: "Allready exist",
      data: {},
    });
  } else {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result) {
        newproducts.product_image = result.secure_url;
        fs.unlinkSync(req.file.path);
      }
      newproducts
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: " success",
            data: data,
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }
  }
};

exports.product_list = async (req, res) => {
  const findall = await products
    .find()
    .sort({ sortorderd: 1 })
    .populate("brand")
    .populate("units_name")
    .populate("category")
    .populate("sub_category")
    .populate("color")
    .populate("size");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.del_product = async (req, res) => {
  const del_products = await products.deleteOne({ _id: req.params.id });
  if (del_products) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: del_products,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.edit_product = async (req, res) => {
  const {
    product_name,
    description,
    type,
    brand,
    model,
    quantity,
    gst_class,
    min_selling_Q,
    max_selling_Q,
    reward_points,
    product_image,
    video_url,
    metadata,
    meta_desc,
    product_search_tags,
    mrp,
    buying_price,
    m_margin,
    selling_price,
    m_customer,
    save_parsent,
    units_name,
  } = req.body;

  data = {};
  if (product_name) {
    data.product_name = product_name;
  }
  if (description) {
    data.description = description;
  }
  if (type) {
    data.type = type;
  }
  if (brand) {
    data.brand = brand;
  }
  if (model) {
    data.model = model;
  }
  if (quantity) {
    data.quantity = quantity;
  }
  if (gst_class) {
    data.gst_class = gst_class;
  }
  if (min_selling_Q) {
    data.min_selling_Q = min_selling_Q;
  }
  if (max_selling_Q) {
    data.max_selling_Q = max_selling_Q;
  }
  if (reward_points) {
    data.reward_points = reward_points;
  }
  if (product_image) {
    data.product_image = product_image;
  }
  if (video_url) {
    data.video_url = video_url;
  }
  if (metadata) {
    data.metadata = metadata;
  }
  if (meta_desc) {
    data.meta_desc = meta_desc;
  }
  if (product_search_tags) {
    data.product_search_tags = product_search_tags;
  }
  if (mrp) {
    data.mrp = mrp;
  }
  if (buying_price) {
    data.buying_price = buying_price;
  }
  if (m_margin) {
    data.m_margin = m_margin;
  }
  if (selling_price) {
    data.selling_price = selling_price;
  }
  if (m_customer) {
    data.m_customer = m_customer;
  }
  if (save_parsent) {
    data.save_parsent = save_parsent;
  }
  if (units_name) {
    data.units_name = units_name;
  }

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    data.product_image = result.secure_url;
    fs.unlinkSync(req.file.path);
  }
  if (data) {
    const findandUpdateEntry = await products.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    }
  }
};

exports.viewone_product = async (req, res) => {
  const findexist = await products.findOne({ _id: req.params.id });
  if (findexist) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findexist,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.productby_category = async (req, res) => {
  let finddata = await subproductcategories
    .find({ category: req.params.id })
    .sort({ sortoredr: 1 })
    .populate("category")
    .then((finddata) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: finddata,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.recently_add_product = async (req, res) => {
  let finddata = await products.find().sort({ createdAt: -1 });
  if (finddata) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: finddata,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
