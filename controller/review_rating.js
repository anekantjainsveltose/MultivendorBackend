const Review = require('../models/review_rating');
const products = require('../models/product');


exports.add_review_rating = async (req, res) => {
    const { userid, productId,rating,comment} = req.body;

    const getproduct = await products.findOne({productId:productId})
    let getcount = getproduct.count
    console.log("count",getproduct)
    let sum = getcount+1
    const newReview = new Review({
        userid: userid,
        productId:productId,
        rating:rating,
        comment:comment,
       // count:sum
         
    })
 const findexist = await Review.findOne({$and:[{userid:userid},{productId:productId}]});
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newReview
        .save()
        .then((newReview) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newReview,
            })
        })

        await products.findOneAndUpdate(
            {productId: productId},
            {$set: {count:sum}},
            {new: true}
        )
        .catch((error) => {
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            })
        })
    }
}

exports.getReviewList = async(req, res)=>{
    const findexist = await Review.find().sort({sortorder:1}).populate("productId")
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.del_Review = async(req, res)=>{
    try {
        const deleteone = await Review.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.viewone_review = async(req, res)=>{
    try {
        const findexist = await Review.findOne({_id: req.params.id}).populate("productId")
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.edit_Review = async(req, res)=>{
    try {
        const updatedata = await Review.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true},
        )
        res.status(200).json({
            status: true,
            msg: "success",
            data: updatedata,
        })
    }catch (error) {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.top_rated_product = async(req, res)=>{
    const getproduct = await products.find().sort({count:-1})
    if(getproduct){
        res.status(200).json({
            status: true,
            msg: "success",
            data: getproduct,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}
