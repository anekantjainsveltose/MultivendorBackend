const DealOfDay = require('../models/deal_of_day');
//hfbjj

exports.add_dealOfDay = async (req, res) => {
    const { title, desc,status,productId,start_date,end_date } = req.body;


    const newDealOfDay = new DealOfDay({
        title: title,
        desc: desc,
        status:status,
        productId:productId,
        start_date:start_date,
        end_date:end_date
    })
 const findexist = await DealOfDay.findOne({productId: productId});
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "Allready exist",
            data: {},
        })
    }else{
    newDealOfDay
        .save()
        .then((newDealOfDay) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newDealOfDay,
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

exports.getDealOfDay = async(req, res)=>{
    const findexist = await DealOfDay.find().sort({sortorder:1}).populate("productId")
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

exports.del_DealOfDay = async(req, res)=>{
    try {
        const deleteone = await DealOfDay.deleteOne({_id: req.params.id});
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

exports.viewone_dealOfDay = async(req, res)=>{
    try {
        const findexist = await DealOfDay.findOne({_id: req.params.id}).populate("productId")
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

exports.edit_DealOfDay = async(req, res)=>{
    try {
        const updatedata = await DealOfDay.findOneAndUpdate(
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