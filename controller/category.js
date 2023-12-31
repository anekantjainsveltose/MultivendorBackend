const Category = require("../models/category");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// exports.addcategory = async (req, res) => {

//     const {category_name, desc, image} = req.body;

//     const addusercategory = new Category({
//         category_name: category_name,
//          desc: desc,
//         image: image,
//     });
//     // console.log('addusercategory', addusercategory);
//     if(req. file){
//         const findexist = await Category.findOne({category_name: category_name});
//         if(findexist){
//             res.status(403).json({
//                 status : false,
//                 msg: "Already exist",
//                 data: {},
//             });
//         }else{
//             const result = await cloudinary.uploader.upload(req.file.path);
//             if(result){
//                 addusercategory.img = result.secure_url;
//                 fs.unlinkSync(req.file.path);
//                 addusercategory
//                 .save()
//                 .then((data)=>{
//                     res.status(200).json({
//                         stauts: true,
//                         msg: "success",
//                         data: data,
//                     })
//                 })
//                 .catch((error)=>{
//                     res.status(400).json({
//                         status: false,
//                         msg: "error",
//                         error: error,
//                     });
//                 });
//             }else{
//                 res.status(200).json({
//                     status: false,
//                     msg: "img not upload",
//                 });
//             }
//         }
//     }
// };

exports.addcategory = async (req, res) => {
  const {
    category_name,
    parent,
    type,
    thumbnail_img,
    feature,
    image,
    web_banner,
    app_banner,
  } = req.body;

  const newCategory = new Category({
    category_name: category_name,
    parent: parent,
    type: type,
    feature: feature,
    thumbnail_img: thumbnail_img,
    image: image,
    web_banner: web_banner,
    app_banner: app_banner,
  });
  const findexist = await Category.findOne({ category_name: category_name });

  if (findexist) {
    res.json({
      status: false,
      msg: "Allready exist",
      data: {},
    });
  } else {
    const { image, thumbnail_img, web_banner, app_banner } = req.files;

    if (image) {
      image_array = [];
      for (let i = 0; i < req.files.image.length; i++) {
        const resp = await cloudinary.uploader.upload(req.files.image[i].path);
        fs.unlinkSync(req.files.image[i].path);
        image_array.push(resp.secure_url);
      }
      newCategory.image = image_array[0];
    }
    if (thumbnail_img) {
      thumbnail_img_array = [];

      for (let i = 0; i < req.files.thumbnail_img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.thumbnail_img[i].path
        );
        fs.unlinkSync(req.files.thumbnail_img[i].path);
        thumbnail_img_array.push(resp.secure_url);
      }
      newCategory.thumbnail_img = thumbnail_img_array[0];
    }
    if (web_banner) {
      alluploads = [];
      for (let i = 0; i < req.files.web_banner.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.web_banner[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.web_banner[i].path);
        alluploads.push(resp.secure_url);
      }
      newCategory.web_banner = alluploads;
    }
    if (app_banner) {
      alluploads = [];
      for (let i = 0; i < req.files.app_banner.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.app_banner[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.app_banner[i].path);
        alluploads.push(resp.secure_url);
      }
      newCategory.app_banner = alluploads;
    }

    console.log(newCategory);
    console.log(req.files);
    newCategory
      .save()
      .then((data) => {
        res.status(200).json({
          stauts: true,
          msg: "success",
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
};

exports.getallcategory = async (req, res) => {
  const findall = await Category.find().sort({
    sortorder: 1,
  });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(403).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.viewonecategory = async (req, res) => {
  const findone = await Category.findOne({ _id: req.params.id });
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(403).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.del_one_category = async (req, res) => {
  const deleteuser = await Category.deleteOne({ _id: req.params.id });
  if (deleteuser) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteuser,
    });
    res.status(403).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.category_true_false = async (req, res) => {
  const { status } = req.body;
  
  const findupdate = await Category.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: status } },
    { new: true }
  );
  if (findupdate) {
    res.status(200).json({
      status: true,
      msg: "success",
      status: findupdate.status,
    });
  } else {
    res.status(403).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.edit_category = async (req, res) => {
  const { category_name, image, thumbnail_img, status, type, feature } =
    req.body;

  data = {};
  if (category_name) {
    data.category_name = category_name;
  }
  if (type) {
    data.type = type;
  }
  if (image) {
    data.image = image;
  }
  if (feature) {
    data.feature = feature;
  }

  if (status) {
    data.status = status;
  }
  if (req.files) {
    if (req.files.image) {
      alluploads = [];
      for (let i = 0; i < req.files.image.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.image[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.image[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.image = alluploads;
    }
    if (req.files.thumbnail_img) {
      newArray1 = [];
      for (let i = 0; i < req.files.thumbnail_img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.thumbnail_img[i].path,
          {
            use_filename: true,
            unique_filename: false,
          }
        );
        fs.unlinkSync(req.files.thumbnail_img[i].path);
        newArray1.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.thumbnail_img = newArray1;
    }
    if (req.files.web_banner) {
      webArray = [];
      for (let i = 0; i < req.files.web_banner.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.web_banner[i].path,
          {
            use_filename: true,
            unique_filename: false,
          }
        );
        fs.unlinkSync(req.files.web_banner[i].path);
        webArray.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.web_banner = webArray;
    }
    if (req.files.app_banner) {
      appArray = [];
      for (let i = 0; i < req.files.app_banner.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.app_banner[i].path,
          {
            use_filename: true,
            unique_filename: false,
          }
        );
        fs.unlinkSync(req.files.app_banner[i].path);
        appArray.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.app_banner = appArray;
    }
  }
  if (data) {
    const findexist = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
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
        error: "error",
      });
    }
  }
};
