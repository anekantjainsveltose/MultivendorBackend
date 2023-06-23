const subproductcategories = require('../models/sub_category');
const resp = require("../helpers/apiResponse");

const cloudinary= require('cloudinary').v2;
const fs = require('fs');
require("dotenv").config();


exports.addsubcategory= async (req, res)=>{
    const {subcategory_name, image, category, feature,status,type}=req.body;

    const  newsubcategory = subproductcategories({

        subcategory_name: subcategory_name,
        type:type,
        feature:feature,
        image: image,
        category:category,
        status: status,
    });
    console.log("nnn",newsubcategory)
    const findexist = await subproductcategories.findOne({subcategory_name: subcategory_name});
    console.log('findexist', findexist)
    if(findexist){
        res.status(403).json({
            status:false,
            msg:"Allready exist",
            data:{},
        })
    }else{
        if (req.files.image[0].path) {
            image_array = [];
            for (let i = 0; i < req.files.image.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.image[i].path,
                );
                fs.unlinkSync(req.files.image[i].path);
                image_array.push(resp.secure_url);
            }
            newsubcategory.image = image_array;
        }
        if (req.files.thumbnail_img[0].path) {
            thumbnail_img_array = [];
            for (let i = 0; i < req.files.thumbnail_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.thumbnail_img[i].path,
                    { use_filename: true, unique_filename: false },
                    function (cb) {
                        // console.log(cb);
                    }
                );
                fs.unlinkSync(req.files.thumbnail_img[i].path);
                thumbnail_img_array.push(resp.secure_url);
            }
            newsubcategory.thumbnail_img = thumbnail_img_array;
        }
            if (req.files.webbanner[0].path) {
                alluploads = [];
                for (let i = 0; i < req.files.webbanner.length; i++) {
                    const resp = await cloudinary.uploader.upload(
                        req.files.webbanner[i].path,
                        { use_filename: true, unique_filename: false }
                    );
                    fs.unlinkSync(req.files.webbanner[i].path);
                    alluploads.push(resp.secure_url);
                }
                newsubcategory.webbanner = alluploads;
            }
            if (req.files.app_banner[0].path) {
                alluploads = [];
                for (let i = 0; i < req.files.app_banner.length; i++) {
                    const resp = await cloudinary.uploader.upload(
                        req.files.app_banner[i].path,
                        { use_filename: true, unique_filename: false }
                    );
                    fs.unlinkSync(req.files.app_banner[i].path);
                    alluploads.push(resp.secure_url);
                }
                newsubcategory.app_banner = alluploads;
           
        }
        newsubcategory
            .save()
            .then((data) => {
                res.status(200).json({
                    stauts: true,
                    msg: "success",
                    data: data,
                })
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
exports.getalldata= async (req, res)=>{
    const findall = await subproductcategories.find().sort({
        sortorder:1
    }).populate("category")
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error: "error",
        })
    }
}

exports.sub_viewonedata= async(req, res)=>{
    const findone=await subproductcategories.findOne({_id: req.params.id})
    if(findone){
        res.status(200).json({
            status:true,
            msg:'success',
            data:findone,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:"error",
            error:"error",
        })
    }
}

exports.del_subcategory= async(req, res)=>{
    const deleteone = await subproductcategories.deleteOne({_id: req.params.id});
    if(deleteone){
        res.status(200).json({
            status:true,
            msg:'success',
            data:deleteone,
        })
    }else{
        res.status(403).json({
            status:false,
            msg:'error',
            error:"error",
        })
    }
}


// exports.edit_Subcategory = async (req, res) => {
//     const { subcategory_name, image,type,feature, status,category} = req.body;

//     data = {};
//     if (subcategory_name) {
//         data.subcategory_name = subcategory_name;
//     }
//     if(type){
//         data.type = type
//     }
//     if(feature){
//         data.feature =feature
//     }
//     if(category){
//         data.category = category
//     }
//     if (image) {
//         data.image = image;
//     }
    
//     if (status) {
//         data.status = status;
//     }
//     if (req.files) {
//         if (req.files.image) {
//           alluploads = [];
//           for (let i = 0; i < req.files.image.length; i++) {
//             // console.log(i);
//             const resp = await cloudinary.uploader.upload(req.files.image[i].path, {
//               use_filename: true,
//               unique_filename: false,
//             });
//             fs.unlinkSync(req.files.image[i].path);
//             alluploads.push(resp.secure_url);
//           }
//           // newStore.storeImg = alluploads;
//           data.image = alluploads;
//         }
//         if (req.files.thumbnail_img) {
//             newArray1 = [];
//             for (let i = 0; i < req.files.thumbnail_img.length; i++) {
//               // console.log(i);
//               const resp = await cloudinary.uploader.upload(req.files.thumbnail_img[i].path, {
//                 use_filename: true,
//                 unique_filename: false,
//               });
//               fs.unlinkSync(req.files.thumbnail_img[i].path);
//               newArray1.push(resp.secure_url);
//             }
//             // newStore.storeImg = alluploads;
//             data.thumbnail_img = newArray1;
//           }
//           if (req.files.web_banner) {
//             webArray = [];
//             for (let i = 0; i < req.files.web_banner.length; i++) {
//               // console.log(i);
//               const resp = await cloudinary.uploader.upload(req.files.web_banner[i].path, {
//                 use_filename: true,
//                 unique_filename: false,
//               });
//               fs.unlinkSync(req.files.web_banner[i].path);
//               webArray.push(resp.secure_url);
//             }
//             // newStore.storeImg = alluploads;
//             data.web_banner = webArray;
//           }
//           if (req.files.app_banner) {
//             appArray = [];
//             for (let i = 0; i < req.files.app_banner.length; i++) {
//               // console.log(i);
//               const resp = await cloudinary.uploader.upload(req.files.app_banner[i].path, {
//                 use_filename: true,
//                 unique_filename: false,
//               });
//               fs.unlinkSync(req.files.app_banner[i].path);
//               appArray.push(resp.secure_url);
//             }
//             // newStore.storeImg = alluploads;
//             data.app_banner = appArray;
//           }
//      }
//     if (data) {
//         const findexist = await subproductcategories.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: data },
//             { new: true }
//         );
//         if (findexist) {
//             res.status(200).json({
//                 status: true,
//                 msg: "success",
//                 data: findexist,
//             })
//         }
//     } else {
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error",
//         })
//     }
// }


exports.edit_Subcategory = async (req, res) => {
    const { subcategory_name,     status,type,feature} = req.body;

    data = {};
    if (subcategory_name) {
        data.subcategory_name = subcategory_name;
    }
    if (type) {
        data.type = type;
    }
   
    if(feature){
        data.feature = feature
    }
    
    if (status) {
        data.status = status;
    }
    if(req.files){
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
              const resp = await cloudinary.uploader.upload(req.files.thumbnail_img[i].path, {
                use_filename: true,
                unique_filename: false,
              });
              fs.unlinkSync(req.files.thumbnail_img[i].path);
              newArray1.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.thumbnail_img = newArray1;
          }
        //   if (req.files.web_banner) {
        //     webArray = [];
        //     for (let i = 0; i < req.files.web_banner.length; i++) {
        //       // console.log(i);
        //       const resp = await cloudinary.uploader.upload(req.files.web_banner[i].path, {
        //         use_filename: true,
        //         unique_filename: false,
        //       });
        //       fs.unlinkSync(req.files.web_banner[i].path);
        //       webArray.push(resp.secure_url);
        //     }
        //     // newStore.storeImg = alluploads;
        //     data.web_banner = webArray;
        //   }
          if (req.files.app_banner) {
            appArray = [];
            for (let i = 0; i < req.files.app_banner.length; i++) {
              // console.log(i);
              const resp = await cloudinary.uploader.upload(req.files.app_banner[i].path, {
                use_filename: true,
                unique_filename: false,
              });
              fs.unlinkSync(req.files.app_banner[i].path);
              appArray.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.app_banner = appArray;
          }
          if (req.files.webbanner) {
            webArray = [];
            for (let i = 0; i < req.files.webbanner.length; i++) {
              // console.log(i);
              const resp = await cloudinary.uploader.upload(req.files.webbanner[i].path, {
                use_filename: true,
                unique_filename: false,
              });
              fs.unlinkSync(req.files.webbanner[i].path);
              webArray.push(resp.secure_url);
            }
            // newStore.storeImg = alluploads;
            data.webbanner = webArray;
          }
        }
     await subproductcategories.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    
}
 