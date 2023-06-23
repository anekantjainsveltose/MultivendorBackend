const HotDeals = require('../models/hot_deals');
//hfbjj

exports.add_HotDeals = async (req, res) => {
    const { title, desc,status,productId,start_date,end_date } = req.body;


    const newHotDeals = new HotDeals({
        title: title,
        desc: desc,
        status:status,
        productId:productId,
        start_date:start_date,
        end_date:end_date
    })
 const findexist = await HotDeals.findOne({productId: productId});
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
        newHotDeals
        .save()
        .then((newHotDeals) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newHotDeals,
            })
        })
        .catch((error) => {
            res.status(400).json({
                status: false,
                msg: "error",
                error: error,
            })
        })
    }
}

exports.HotDealsList = async(req, res)=>{
    const findexist = await HotDeals.find().sort({sortorder:1}).populate("productId")
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

exports.del_HotDeals = async(req, res)=>{
    try {
        const deleteone = await HotDeals.deleteOne({_id: req.params.id});
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

exports.viewone_HotDeals = async(req, res)=>{
    try {
        const findexist = await HotDeals.findOne({_id: req.params.id}).populate("productId")
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

exports.edit_HotDeals = async(req, res)=>{
    try {
        const updatedata = await HotDeals.findOneAndUpdate(
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