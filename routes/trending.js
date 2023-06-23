const express= require("express");
const router = express.Router();



const {
    add_trending_product,
    getall_trending_product,
    del_trending_product,
}=require('../controller/trending');


router.post('/admin/add_trending_product', add_trending_product);

router.get('/admin/getall_trending_product', getall_trending_product);

router.delete('/admin/del_trending_product/:id', del_trending_product);

module.exports = router;