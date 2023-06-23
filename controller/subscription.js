const subscription = require("../models/subscription");


exports.addsubscription = async (req, res) => {
    const {
        customerId,
        vender_id,
        group_id,
        date_add,
        subscribed_product,
        quantity,
        validity,
        status,
    } = req.body;

    const newsubscription = new subscription({
        customerId: customerId,
        vender_id: vender_id,
        group_id: group_id,
        date_add: date_add,
        subscribed_product: subscribed_product,
        quantity: quantity,
        validity: validity,
        status: status,
    })
    // const findexist = await subscription.findOne({ customerId: customerId })
    // if (findexist) {
    //     res.status(403).json({
    //         status: false,
    //         msg: "Allready Subscribed",
    //         data: {},
    //     })
    // }else{
        newsubscription.save()
            .then((data) => {
                res.status(200).json({
                    status: true,
                    msg: "success",
                    data: data,
                })
            })
            .catch((error) => {
                res.status(400).json({
                    status: false,
                    msg: "error",
                    error: error,
                })
            })
        // }
}

exports.total_subscription_list = async(req, res)=>{
    const getall_subscription = await subscription.find({customerId: req.params.id})
    .populate("vender_id")
    .populate("group_id")
    .populate("subscribed_product")
    if(getall_subscription){
        res.status(200).json({
            status: false,
            msg: "success",
            length: getall_subscription.length,
            data: getall_subscription,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}


exports.delete_subscription = async(req, res)=>{
    const delete_sub = await subscription.deleteOne({_id: req.params.id})
    if(delete_sub){
        res.status(200).json({
            status: true,
            msg: "success",
            data: delete_sub,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.total_subscription = async(req, res)=>{
    await subscription.countDocuments()
    .then((data)=>{
        res.status(200).json({
            status: true,
            msg: "success",
            data: data
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


exports.SubscrptionList = async(req, res)=>{
    const findalldata = await subscription.find().sort({sortorder: 1}).populate("customerId").populate("vender_id").populate("subscribed_product").populate("group_id")
    if(findalldata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findalldata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}
