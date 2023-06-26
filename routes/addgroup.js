const { Router } = require("express");
const express = require("express");
const router = express.Router();

const {
  addvender_group,
  group_list,
  group_list_active,
} = require("../controller/addgroup");

router.post("/app/addvender_group", addvender_group);

router.get("/app/group_list", group_list);

router.get("/app/group_list_active", group_list_active);

module.exports = router;
