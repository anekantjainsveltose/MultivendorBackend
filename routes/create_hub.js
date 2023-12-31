const express = require("express");
const router = express.Router();

const {
  addhub,
  hublist,
  viewone_hub,
  del_hub,
  edit_hub,
  hub_login,
} = require("../controller/create_hub");

router.post("/admin/addhub", addhub);

router.get("/admin/hublist", hublist);

router.get("/admin/viewone_hub/:id", viewone_hub);

router.delete("/admin/del_hub/:id", del_hub);

router.post("/admin/edit_hub/:id", edit_hub);

router.post("/admin/login_hub", hub_login);

module.exports = router;
