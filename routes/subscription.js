const express= require("express");
const router = express.Router();



const {
    addsubscription,
    total_subscription_list,
    delete_subscription,
    total_subscription,
    SubscrptionList
}=require('../controller/subscription');



router.post("/admin/addsubscription", addsubscription);

router.get("/admin/total_subscription_list/:id", total_subscription_list);

router.delete("/admin/delete_subscription/:id", delete_subscription);

router.get("/admin/total_subscription", total_subscription);
router.get("/admin/SubscrptionList", SubscrptionList);


module.exports = router;