const express = require("express");
const router = express.Router();

const {
  addCustomer,
  customersList,
  view_one_customer,
  delete_customer,
  edit_customer,
} = require("../controller/customer");

router.post("/admin/addCustomer", addCustomer);
router.get("/admin/customersList", customersList);
router.get("/admin/view_one_customer/:id", view_one_customer);
router.delete("/admin/delete_customer/:id", delete_customer);
router.post("/admin/edit_customer/:id", edit_customer);

module.exports = router;
