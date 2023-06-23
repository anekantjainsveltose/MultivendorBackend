const vender_group = require('../models/addgroup');
const User = require('../models/user');

exports.addvender_group = async(req, res)=>{
    const {
        customerId,
        group_name,
        active_group,
    }=req.body;

    const findexist = await vender_group.findOne({group_name: group_name})
    if(findexist){
        res.status(403).json({
            status: false,
            msg: "allready exist",
            findexist: {},
        })
    }
    const newaddgroup = vender_group({
        customerId: customerId,
        group_name: group_name,
        active_group: active_group,
    })
    newaddgroup.save()
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
    await User.updateMany(
        {_id: req.body.customerId},
        {$set: {active_group: "Active"}},
        {new: true},
    )
}

exports.group_list = async(req, res)=>{
    const findalldata = await User.find({active_group: "Deactive"})
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

exports.group_list_active = async(req, res)=>{
    const findalldata = await User.find({active_group: "Active"})
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


