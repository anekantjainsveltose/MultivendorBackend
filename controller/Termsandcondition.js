const termsandcondition = require('../models/Termsandcondition');

exports.addterm_condition = async(req, res)=>{
    const {
        description,
    }=req.body;

    const newterm_condition = new termsandcondition({
        description: description,
    })
    newterm_condition.save()
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

exports.getall_term_condition = async(req, res)=>{
    const findalldata = await termsandcondition.find().sort({sortorder: 1})
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


exports.del_term_condition = async(req, res)=>{
    const deleteonedata = await termsandcondition.deleteOne({_id: req.params.id})
    if(deleteonedata){
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteonedata,
        })
    }else{
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_term_condition = async(req, res)=>{
    const findonedata = await termsandcondition.findOne({_id: req.params.id})
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
