const express = require("express");
const router = express.Router();

const {
  addprivacy_policy,
  getallprivacy_policy,
  del_privacy_policy,
  viewone_privacy_policy,
} = require("../controller/privacypolicy");

router.post("/admin/addprivacy_policy", addprivacy_policy);
router.get("/admin/getallprivacy_policy", getallprivacy_policy);
router.delete("/admin/del_privacy_policy/:id", del_privacy_policy);
router.get("/admin/viewone_privacy_policy/:id", viewone_privacy_policy);

module.exports = router;
