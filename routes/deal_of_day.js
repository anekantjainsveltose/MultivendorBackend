const express = require("express");
const router = express.Router();

const {
  add_dealOfDay,
  getDealOfDay,
  edit_DealOfDay,
  viewone_dealOfDay,
  del_DealOfDay,
} = require("../controller/deal_of_day");

router.post("/admin/add_dealOfDay", add_dealOfDay);

router.get("/admin/getDealOfDay", getDealOfDay);
router.post("/admin/edit_DealOfDay/:id", edit_DealOfDay);
router.get("/admin/viewone_dealOfDay/:id", viewone_dealOfDay);

router.delete("/admin/del_DealOfDay/:id", del_DealOfDay);

module.exports = router;
