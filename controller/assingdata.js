// const assingdata = require('../models/assingdata');


// // exports.add_assingdata = async (req, res) => {
// //     const { Assinged } = req.body;
// //     const newassing = new assingdata({
// //         Assinged: Assinged,
// //     })
// //     newassing
// //         .save()
// //         .then((newassing) => {
// //             res.status(200).json({
// //                 status: true,
// //                 msg: "success",
// //                 data: newassing,
// //             })
// //         })
// //         .catch((error) => {
// //             res.status(400).json({
// //                 status: false,
// //                 msg: "error",
// //                 error: error,
// //             })
// //         })
// // }

// // exports.getall_assinged = async(req, res)=>{
// //     const findexist = await assingdata.find({assing_driver: req.params.id}).sort({sortorder:1})
// //     .populate("Assinged")

// //     if(findexist){
// //         res.status(200).json({
// //             status: true,
// //             msg: "success",
// //             data: findexist,
// //         })
// //     }else{
// //         res.status(400).json({
// //             status: false,
// //             msg: "error",
// //             error: "error",
// //         })
// //     }
// // }




// exports.assinged_driver = async(req, res)=>{
//     const findexist = await orderproduct.findOneAndUpdate(
//         {_id: req.params.id},
//         {$set: {assing_drive:req.body.assing_drive,assign_status:"true"}},
//         {new : true},
//     )
//     if(findexist){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findexist,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error",
//         })
//     }
// }


// // exports.listby_assinged_driver = async(req, res)=>{
// //     const getalldata = await orderproduct.find({_id: req.params.id})
// //     if(getalldata){
// //         res.status(200).json({
// //             status: true,
// //             msg: "success",
// //             data: getalldata,
// //         })
// //     }else{
// //         res.status(400).json({
// //             status: false,
// //             msg: "error",
// //             error: "error",
// //         })
// //     }
// // }

// exports.getall_assinged_drive = async(req, res)=>{
//     const findexist = await orderproduct.find({assign_status: "true"})
//     // .populate("customerId")
//     .populate("product")
//     .populate("assing_drive")
//     if(findexist){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findexist,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             mag: "error",
//             error: "error",
//         })
//     }
// }

// exports.viewone_assinged_drive = async(req, res)=>{
//     const findone = await orderproduct.findOne({_id: req.params.id})
//     if(findone){
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findone,
//         })
//     }else{
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error",
//         })
//     }
// }


