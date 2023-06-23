const express = require('express');
const router = express.Router()

const{
    add_HotDeals,
    HotDealsList,
    edit_HotDeals,
    viewone_HotDeals,
    del_HotDeals
}=require("../controller/hot_deals");


router.post("/admin/add_HotDeals", add_HotDeals);

router.get("/admin/HotDealsList", HotDealsList);
router.post("/admin/edit_HotDeals/:id", edit_HotDeals);
router.get("/admin/viewone_HotDeals/:id", viewone_HotDeals);

router.delete("/admin/del_HotDeals/:id", del_HotDeals);



module.exports = router;