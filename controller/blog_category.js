const blog_category = require('../models/blog_category')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addblog_category = async(req, res)=>{
    const {
        cate_title,
        cate_img,
        cate_desc,
        cate_type,
    }=req.body;
    const newblogcategory = blog_category({
        cate_title: cate_title,
        cate_img: cate_img,
        cate_desc: cate_desc,
        cate_type: cate_type,
    })
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path)
        if(result){
            newblogcategory.cate_img = result.secure_url;
            fs.unlinkSync(req.file.path);
        }
        newblogcategory.save()
        .then((data)=>{
            res.status(200).json({
                status: true,
                msg: "succes",
                data: data,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            })
        })
    }
}

exports.getlist_blog_category = async(req, res)=>{
    const findall_category = await blog_category.find().sort({sortorder: 1});
    if(findall_category){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall_category,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            data: "error", 
        })
    }
}

exports.delete_blog_category = async(req, res)=>{
    const deletedata = await blog_category.deleteOne().sort({sortorder: 1});
    if(deletedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deletedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            data: "error", 
        })
    }
}

exports.edit_blog_category = async(req,res)=>{
    const {
        cate_title,
        cate_img,
        cate_desc,
        cate_type,
    }=req.body;

    data = {};
    if(cate_title){
        data.cate_title = cate_title;
    }
    if(cate_img){
        data.cate_img = cate_img;
    }
    if(cate_desc){
        data.cate_desc = cate_desc;
    }
    if(cate_type){
        data.cate_type = cate_type;
    }
    if(req.files){
        if(req.files.cate_img){
            alluploads = [];
            for(let i=0; i< req.files.cate_img.length; i++){
                const result = await cloudinary.uploader.upload(
                    req.files.cate_img[i].path,
                    {use_filename: true, unique_filename: false}
                );
                fs.unlinkSync(req.files.cate_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.cate_img = alluploads;
        }
    }
    if(data){
        const updatedata = await blog_category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: data},
            {new: true},
        )
        if(updatedata){
            res.status(200).json({
                status: true,
                msg: "update successfully",
                data: "error",
            })
        }else{
            res.status(400).json({
                status: false,
                msg: "error",
                data: "error",
            })
        }
    }

}