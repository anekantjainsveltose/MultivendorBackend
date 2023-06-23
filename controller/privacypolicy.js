const privacypolicy = require('../models/privacypolicy');

exports.addprivacy_policy = async(req, res)=>{
    const {
        description,
    }=req.body;

    const newprivacy = new privacypolicy({
        description: description,
    })
    newprivacy.save()
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

exports.del_privacy_policy = async(req, res)=>{
    const delete_policy = await privacypolicy.deleteOne({_id: req.params.id})
    if(delete_policy){
        res.status(200).json({
            status: true,
            msg: "success",
            data: delete_policy,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.getallprivacy_policy = async(req, res)=>{
    const finddata = await privacypolicy.find().sort({sortoredr: 1})
    if(finddata){
        res.status(200).json({
            status: true,
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

exports.viewone_privacy_policy = async(req, res)=>{
    const findonedata = await privacypolicy.findOne({_id: req.params.id})
    if(findonedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}