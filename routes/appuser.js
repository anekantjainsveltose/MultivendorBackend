const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const{
  vender_register,
  vender_veryfyotp,
  vender_register_img,
  login_vender_sendotp,
  vender_login_veryfyotp,
  vender_getlist,
  vender_getviewone,
  vender_deleteone,
  vender_approve,
  admin_add_vender,
  edit_admin_vender,
}=require("../controller/appuser");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      let path = `./uploads`;
      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads");
      }
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },  
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg")
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let uploads = multer({ storage: storage });

  let multipleUpload = uploads.fields([
    { name: "vendoor_img", maxCount: 1 },
    { name: "adhar_img_front", maxCount: 1 },
    { name: "adhar_img_back", maxCount: 1 },
    { name: "pancard_img_front", maxCount: 1 },
    { name: "pancard_img_back", maxCount: 1 },  
    { name: "passbook_img", maxCount: 1 },
  ]);
   
  router.post("/app/vender_register", vender_register)
  
  router.post("/app/vender_veryfyotp", vender_veryfyotp)
  
  router.post("/app/vender_register_img/:id", multipleUpload, vender_register_img)
  
  router.post("/app/login_vender_sendotp", login_vender_sendotp)

  router.post("/app/vender_login_veryfyotp", vender_login_veryfyotp)

router.get("/app/vender_getlist", vender_getlist)

router.get("/app/vender_getviewone/:id", vender_getviewone)

router.delete("/app/vender_deleteone/:id", vender_deleteone)

router.post("/app/vender_approve/:id", vender_approve)

router.post("/admin/admin_add_vender", multipleUpload, admin_add_vender);

router.post("/admin/edit_admin_vender/:id", multipleUpload, edit_admin_vender);

module.exports = router;