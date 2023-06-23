const express = require('express')
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const {
        addblog_category,
        getlist_blog_category,
        delete_blog_category,
        edit_blog_category
}=require('../controller/blog_category');


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

  

router.post('/admin/addblog_category', uploads.single("cate_img"), addblog_category)

router.get('/admin/getlist_blog_category', getlist_blog_category)

router.delete('/admin/delete_blog_category/:id', delete_blog_category)

router.post('/admin/edit_blog_category/:id', edit_blog_category)

module.exports = router;