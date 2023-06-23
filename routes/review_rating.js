const express = require("express");
const router = express.Router();

const{
    add_review_rating,getReviewList,viewone_review,del_Review,edit_Review,top_rated_product
   
}=require('../controller/review_rating');


router.post("/user/add_review_rating", add_review_rating);

router.get("/user/getReviewList", getReviewList);

router.get("/admin/viewone_review/:id", viewone_review);

router.delete("/admin/del_Review/:id", del_Review);

router.post("/admin/edit_Review/:id", edit_Review);

router.get("/user/top_rated_product", top_rated_product);









module.exports = router;