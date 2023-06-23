const assingedvender = require('../models/assingvender');


exports.admin_vender_assinged = async (req, res) => {
    const { productId, venderId } = req.body;
    const newassing = new assingedvender({
        productId: productId,
        venderId: venderId,
    })
    newassing
        .save()
        .then((newassing) => {
            res.status(200).json({
                status: true,
                msg: "success",
                data: newassing,
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

exports.getall_vender_assinged = async(req, res)=>{
    const findexist = await assingedvender.find().sort({sortorder:1})
    .populate("productId")
    .populate("venderId")
    

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

exports.getlist_by_venderid = async(req, res)=>{
    const findexist = await assingedvender.find({venderId: req.params.id})
    .populate("venderId")
    .populate("productId")
    if(findexist){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findexist,
        })
    }else{
        res.status(400).json({
            status: false,
            mag: "error",
            error: "error",
        })
    }
}

