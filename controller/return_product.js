const return_product = require('../models/return_product');

exports.add_rejected_product = async(req, res)=>{
    const {
        orderId,
        reason_for_return,
        comments,
    }=req.body;

    const returnnew = new return_product({
        orderId: orderId,
        reason_for_return: reason_for_return,
        comments: comments,
    })

    returnnew.save()
    .then((returnnew)=>{
        res.status(200).json({
            status: true,
            msg: "sucess",
            data: returnnew,
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

exports.getall_return_product = async(req, res)=>{
    const findexist = await return_product.find().sort({sortorder: 1})
    .populate({
        path: "orderId",
        populate: {
          path: "product",
        },
      })
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

exports.viewone_reject_product = async(req, res)=>{ 
    const findData = await return_product.findOne({_id: req.params.id})
    .populate({
        path: "orderId",
        populate: {
          path: "product",
        },
      })
    if(findData){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findData,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            data: "error",
        })
    }
}

exports.delete_reject_product = async(req, res)=>{
    const deletedata = await return_product.deleteOne({_id: req.params.id})
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


exports.edit_return_product = async (req, res)=>{
    const updatedata = await return_product.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    )
    if(updatedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: updatedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}
