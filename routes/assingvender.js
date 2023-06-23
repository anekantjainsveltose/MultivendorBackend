const express = require("express");
const router = express.Router();

const {
    admin_vender_assinged,
    getall_vender_assinged,
    getlist_by_venderid,
}=require('../controller/assingvender');


router.post("/admin/admin_vender_assinged", admin_vender_assinged);
router.get("/admin/getall_vender_assinged", getall_vender_assinged);
router.get("/admin/getlist_by_venderid/:id", getlist_by_venderid);


module.exports = router;
 