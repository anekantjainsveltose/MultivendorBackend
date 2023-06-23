const trending = require('../models/trending');

exports.add_trending_product = async(req, res)=>{
    const {
        productId,
    }=req.body;

    const trendingdata = trending({
        productId: productId,
    })

    const findexist = await trending.findOne({productId: productId})
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "allready exist",
            findexist: {},
        })
    }else{
        trendingdata.save()
        .then((data)=>{
            res.status(200).json({
                status: true,
                msg: "success",
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

exports.getall_trending_product = async(req, res)=>{
    const finddata = await trending.find().sort({sortorder: 1})
    .populate("productId")
    if(finddata){
        res.status(200).json({
            status: false,
            msg: "success",
            data: finddata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.del_trending_product = async(req, res)=>{
    const deletedata = await trending.deleteOne({_id: req.params.id})
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
            error: "error",
        })
    }
}

