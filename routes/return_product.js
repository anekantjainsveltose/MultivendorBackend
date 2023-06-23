const express = require("express");
const router = express.Router();

const{
    add_rejected_product,
    getall_return_product,   
    viewone_reject_product,
    delete_reject_product,
    edit_return_product,
}=require('../controller/return_product');


router.post("/user/add_rejected_product", add_rejected_product);

router.get("/user/getall_return_product", getall_return_product);

router.get("/user/viewone_reject_product/:id", viewone_reject_product);

router.delete("/user/delete_reject_product/:id", delete_reject_product);

router.post("/user/edit_return_product/:id", edit_return_product);



module.exports = router;