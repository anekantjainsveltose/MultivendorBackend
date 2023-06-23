const appvender = require("../models/appuser");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const fs = require("fs");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");
var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg",
};
function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const jwt = require("jsonwebtoken");
const saltRounds = 10;
const key = "verysecretkey";

exports.vender_register = async (req, res) => {
  let length = 4;
  let defaultotp = "1234";
  const {
    email,
    mobile,
    name,
    door_number,
    otp,
    street,
    location,
    city,
    pincode,
    service_location,
    service_city,
    service_pincode,
    status,
  } = req.body;

  const newvender = new appvender({
    email: email,
    mobile: mobile,
    name: name,
    door_number: door_number,
    otp: defaultotp,
    street: street,
    location: location,
    city: city,
    pincode: pincode,
    service_location: service_location,
    service_city: service_city,
    service_pincode: service_pincode,
    status: status,
  });
  let findexist = await appvender.findOne({ mobile: req.body.mobile });
  if (findexist) {
    res.json({
      status: "success",
      msg: "Welcome Back Otp send successfully",
      mobile: findexist.mobile,
      otp: defaultotp,
      _id: findexist._id,
      status: findexist?.status,
    });
  } else {
    newvender
      .save()
      .then((data) => {
        res.json({
          status: "success",
          msg: "Otp send successfully",
          mobile: data?.mobile,
          _id: data?._id,
          otp: defaultotp,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.vender_veryfyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await appvender.findOne({ mobile: mobile });
  if (getuser) {
    if (otp == 1234) {
      await appvender
        .findOneAndUpdate(
          {
            _id: getuser._id,
          },
          { $set: { status: "true" } },
          { new: true }
        )
        .then((data) => {
          res.status(200).send({
            status: true,
            msg: "otp verified",
            otp: otp,
            _id: getuser._id,
            mobile: getuser.mobile,
          });
        });
    } else {
      res.status(200).json({
        status: false,
        msg: "incurrect otp",
      });
    }
  }
};

exports.login_vender_sendotp = async (req, res) => {
  let length = 4;
  let defaultotp = "1234";
  const { mobile } = req.body;

  const findexist = await appvender.findOne({ mobile: mobile });

  if (findexist?.status == "true") {
    console.log("findexist", findexist);
    res.status(200).send({
      status: true,
      msg: "otp Send Successfully",
      otp: findexist.otp,
      _id: findexist._id,
      mobile: findexist.mobile,
    });
  } else if (findexist?.status == "false") {
    res.status(200).json({
      status: true,
      msg: "Waiting for Admin Approval",
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "User doesn't Exist",
    });
  }
};

exports.vender_login_veryfyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await appvender.findOne({ mobile: mobile });
  if (getuser) {
    if (otp == 1234) {
      res.status(200).send({
        status: true,
        msg: "otp verified Successfully",
        otp: otp,
        _id: getuser._id,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "incurrect otp",
      });
    }
  } else {
    res.status(403).json({
      status: false,
      msg: "otp & mobile is not match",
    });
  }
};

exports.vender_register_img = async (req, res) => {
  const {
    adhar_no,
    pancard_no,
    account_no,
    cus_name,
    branch,
    ifsc_code,
    vendoor_img,
    adhar_img_front,
    adhar_img_back,
    pancard_img_front,
    pancard_img_back,
    passbook_img,
  } = req.body;

  let data = {};
  if (adhar_no) {
    data.adhar_no = adhar_no;
  }
  if (pancard_no) {
    data.pancard_no = pancard_no;
  }
  if (account_no) {
    data.account_no = account_no;
  }
  if (cus_name) {
    data.cus_name = cus_name;
  }
  if (branch) {
    data.branch = branch;
  }
  if (ifsc_code) {
    data.ifsc_code = ifsc_code;
  }

  if (vendoor_img) {
    if (vendoor_img) {
      const base64Data = new Buffer.from(
        vendoor_img.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(vendoor_img);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.vendoor_img = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  if (adhar_img_front) {
    if (adhar_img_front) {
      const base64Data = new Buffer.from(
        adhar_img_front.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(adhar_img_front);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.adhar_img_front = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }

  if (adhar_img_back) {
    if (adhar_img_back) {
      const base64Data = new Buffer.from(
        adhar_img_back.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(adhar_img_back);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.adhar_img_back = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }
  if (pancard_img_front) {
    if (pancard_img_front) {
      const base64Data = new Buffer.from(
        pancard_img_front.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(pancard_img_front);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.pancard_img_front = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }

  if (pancard_img_back) {
    if (pancard_img_back) {
      const base64Data = new Buffer.from(
        pancard_img_back.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(pancard_img_back);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.pancard_img_back = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }

  if (passbook_img) {
    if (passbook_img) {
      const base64Data = new Buffer.from(
        passbook_img.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      detectMimeType(base64Data);
      const type = detectMimeType(passbook_img);
      // console.log(newCourse,"@@@@@");
      const geturl = await uploadBase64ImageFile(base64Data, data.id, type);
      console.log(geturl, "&&&&");
      if (geturl) {
        data.passbook_img = geturl.Location;

        //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
      }
    }
  }

  const datas = await appvender.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  );
  if (datas) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: datas,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
  // .then((data) => resp.successr(res, data))
  // .catch((error) => resp.errorr(res, error));
};

// exports.vender_register_img = async (req, res) => {

//     try {
//         const {
//             vendoor_img,
//             adhar_no,
//             adhar_img_front,
//             adhar_img_back,
//             pancard_no,
//             pancard_img_front,
//             pancard_img_back,
//             account_no,
//             cus_name,
//             branch,
//             ifsc_code,
//             passbook_img,

//         } = req.body;

//         data = {};
//      //   console.log(req.body)

//         // if (vendoor_img) {
//         //     data.vendoor_img = vendoor_img;
//         // }
//         if (adhar_no) {
//             data.adhar_no = adhar_no;
//         }
//         if (adhar_img_front) {
//             data.adhar_img_front = adhar_img_front;
//         }
//         if (adhar_img_back) {
//             data.adhar_img_back = adhar_img_back;
//         }
//         if (pancard_no) {
//             data.pancard_no = pancard_no;
//         }
//         if (pancard_img_front) {
//             data.pancard_img_front = pancard_img_front;
//         }
//         if (pancard_img_back) {
//             data.pancard_img_back = pancard_img_back;
//         }
//         if (account_no) {
//             data.account_no = account_no;
//         }
//         if (cus_name) {
//             data.cus_name = cus_name;
//         }
//         if (branch) {
//             data.branch = branch;
//         }
//         if (ifsc_code) {
//             data.ifsc_code = ifsc_code;
//         }
//         if (passbook_img) {
//             data.passbook_img = passbook_img;
//         }

//         if (req.files) {
//             // if (req.files.vendoor_img) {
//             //     alluploads = [];
//             //     for (let i = 0; i < req.files.vendoor_img.length; i++) {
//             //         const result = await cloudinary.uploader.upload(
//             //             req.files.vendoor_img[i].path,
//             //             { use_filename: true, unique_filename: false }
//             //         );
//             //         fs.unlinkSync(req.files.vendoor_img[i].path);
//             //         alluploads.push(result.secure_url);
//             //     }
//             //     data.vendoor_img = alluploads;
//             // }
//             if(req.files.vendoor_img){
//                 console.log(req.files.vendoor_img)
//                 const base64Data   = new Buffer.from(vendoor_img.replace(/^data:image\/\w+;base64,/, ""),'base64')
//                 detectMimeType(base64Data);
//                 const type = detectMimeType(vendoor_img);
//                  //   console.log(newCourse,"@@@@@");
//                    const geturl = await uploadBase64ImageFile(
//                     base64Data,
//                     data.id,
//                    type
//                   );
//                   console.log(geturl,"&&&&");
//                   if (geturl) {
//                     data.vendoor_img = geturl.Location;

//                     //fs.unlinkSync(`../uploads/${req.files.vendoor_img[0]?.filename}`);
//                   }
//                 }

// //@@@@@@@@
//             if (req.files.adhar_img_front) {
//                 alluploads = [];
//                 for (let i = 0; i < req.files.adhar_img_front.length; i++) {
//                     const result = await cloudinary.uploader.upload(
//                         req.files.adhar_img_front[i].path,
//                         { use_filename: true, unique_filename: false }
//                     );
//                     fs.unlinkSync(req.files.adhar_img_front[i].path);
//                     alluploads.push(result.secure_url);
//                 }
//                 data.adhar_img_front = alluploads;
//             }

//             if (req.files.adhar_img_back) {
//                 alluploads = [];
//                 for (let i = 0; i < req.files.adhar_img_back.length; i++) {
//                     const result = await cloudinary.uploader.upload(
//                         req.files.adhar_img_back[i].path,
//                         { use_filename: true, unique_filename: false }
//                     );
//                     fs.unlinkSync(req.files.adhar_img_back[i].path);
//                     alluploads.push(result.secure_url);
//                 }
//                 data.adhar_img_back = alluploads;
//             }

//             if (req.files.pancard_img_front) {
//                 alluploads = [];
//                 for (let i = 0; i < req.files.pancard_img_front.length; i++) {
//                     const result = await cloudinary.uploader.upload(
//                         req.files.pancard_img_front[i].path,
//                         { use_filename: true, unique_filename: false }
//                     );
//                     fs.unlinkSync(req.files.pancard_img_front[i].path);
//                     alluploads.push(result.secure_url);
//                 }
//                 data.pancard_img_front = alluploads;
//             }

//             if (req.files.pancard_img_back) {
//                 alluploads = [];
//                 for (let i = 0; i < req.files.pancard_img_back.length; i++) {
//                     const result = await cloudinary.uploader.upload(
//                         req.files.pancard_img_back[i].path,
//                         { use_filename: true, unique_filename: false }
//                     );
//                     fs.unlinkSync(req.files.pancard_img_back[i].path);
//                     alluploads.push(result.secure_url);
//                 }
//                 data.pancard_img_back = alluploads;
//             }

//             if (req.files.passbook_img) {
//                 alluploads = [];
//                 for (let i = 0; i < req.files.passbook_img.length; i++) {
//                     const result = await cloudinary.uploader.upload(
//                         req.files.passbook_img[i].path,
//                         { use_filename: true, unique_filename: false }
//                     );
//                     fs.unlinkSync(req.files.passbook_img[i].path);
//                     alluploads.push(result.secure_url);
//                 }
//                 data.passbook_img = alluploads;
//             }
//         }
//         if (data) {
//             const updatedata = await appvender.findOneAndUpdate(
//                 { _id: req.params.id },
//                 { $set: data },
//                 { new: true }
//             )
//             if (updatedata) {
//                 res.status(200).json({
//                     status: true,
//                     msg: "success",
//                     data: updatedata,
//                 })
//             }
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error,
//         })
//     }
// }

exports.vender_getlist = async (req, res) => {
  const finddata = await appvender.find().sort({ sortorder: 1 });
  if (finddata) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: finddata,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.vender_getviewone = async (req, res) => {
  const findviewone = await appvender.findOne({ _id: req.params.id });
  if (findviewone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findviewone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.vender_deleteone = async (req, res) => {
  const deleteone = await appvender.deleteOne({ _id: req.params.id });
  if (deleteone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.vender_approve = async (req, res) => {
  try {
    const updatedata = await appvender.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      msg: "success",
      data: updatedata,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.admin_add_vender = async (req, res) => {
  let length = 4;
  let defaultotp = "1234";
  const {
    email,
    mobile,
    name,
    door_number,
    otp,
    street,
    location,
    city,
    pincode,
    service_location,
    service_city,
    service_pincode,
    status,
    vendoor_img,
    adhar_no,
    adhar_img_front,
    adhar_img_back,
    pancard_no,
    pancard_img_front,
    pancard_img_back,
    account_no,
    cus_name,
    branch,
    ifsc_code,
    passbook_img,
  } = req.body;

  const newvender = new appvender({
    email: email,
    mobile: mobile,
    name: name,
    door_number: door_number,
    otp: defaultotp,
    street: street,
    location: location,
    city: city,
    pincode: pincode,
    service_location: service_location,
    service_city: service_city,
    service_pincode: service_pincode,
    status: "true",
    vendoor_img: vendoor_img,
    adhar_no: adhar_no,
    adhar_img_front: adhar_img_front,
    adhar_img_back: adhar_img_back,
    pancard_no: pancard_no,
    pancard_img_front: pancard_img_front,
    pancard_img_back: pancard_img_back,
    account_no: account_no,
    cus_name: cus_name,
    branch: branch,
    ifsc_code: ifsc_code,
    passbook_img: passbook_img,
  });

  if (req.files) {
    if (req.files.vendoor_img) {
      alluploads = [];
      for (let i = 0; i < req.files.vendoor_img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.vendoor_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.vendoor_img[i].path);
        alluploads.push(resp.secure_url);
      }
      newvender.vendoor_img = alluploads;
    }

    if (req.files.adhar_img_front) {
      alluploads = [];
      for (let i = 0; i < req.files.adhar_img_front.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.adhar_img_front[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adhar_img_front[i].path);
        alluploads.push(resp.secure_url);
      }
      newvender.adhar_img_front = alluploads;
    }

    if (req.files.adhar_img_back) {
      alluploads = [];
      for (let i = 0; i < req.files.adhar_img_back.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.adhar_img_back[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adhar_img_back[i].path);
        alluploads.push(result.secure_url);
      }
      newvender.adhar_img_back = alluploads;
    }

    if (req.files.pancard_img_front) {
      alluploads = [];
      for (let i = 0; i < req.files.pancard_img_front.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.pancard_img_front[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.pancard_img_front[i].path);
        alluploads.push(result.secure_url);
      }
      newvender.pancard_img_front = alluploads;
    }

    if (req.files.pancard_img_back) {
      alluploads = [];
      for (let i = 0; i < req.files.pancard_img_back.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.pancard_img_back[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.pancard_img_back[i].path);
        alluploads.push(result.secure_url);
      }
      newvender.pancard_img_back = alluploads;
    }

    if (req.files.passbook_img) {
      alluploads = [];
      for (let i = 0; i < req.files.passbook_img.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.passbook_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.passbook_img[i].path);
        alluploads.push(result.secure_url);
      }
      newvender.passbook_img = alluploads;
    }
    newvender
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })

      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.edit_admin_vender = async (req, res) => {
  const {
    email,
    mobile,
    name,
    door_number,
    street,
    location,
    city,
    pincode,
    service_location,
    service_city,
    service_pincode,
    vendoor_img,
    adhar_no,
    adhar_img_front,
    adhar_img_back,
    pancard_no,
    pancard_img_front,
    pancard_img_back,
    account_no,
    cus_name,
    branch,
    ifsc_code,
    passbook_img,
    status,
  } = req.body;
  console.log("req.body", req.body);
  // return false;

  data = {};

  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (name) {
    data.name = name;
  }
  if (door_number) {
    data.door_number = door_number;
  }
  if (street) {
    data.street = street;
  }
  if (location) {
    data.location = location;
  }
  if (city) {
    data.city = city;
  }
  if (pincode) {
    data.pincode = pincode;
  }
  if (service_location) {
    data.service_location = service_location;
  }
  if (service_city) {
    data.service_city = service_city;
  }
  if (service_pincode) {
    data.service_pincode = service_pincode;
  }
  if (vendoor_img) {
    data.vendoor_img = vendoor_img;
  }
  if (adhar_no) {
    data.adhar_no = adhar_no;
  }
  if (adhar_img_front) {
    data.adhar_img_front = adhar_img_front;
  }
  if (adhar_img_back) {
    data.adhar_img_back = adhar_img_back;
  }
  if (pancard_no) {
    data.pancard_no = pancard_no;
  }
  if (pancard_img_front) {
    data.pancard_img_front = pancard_img_front;
  }
  if (pancard_img_back) {
    data.pancard_img_back = pancard_img_back;
  }
  if (account_no) {
    data.account_no = account_no;
  }
  if (cus_name) {
    data.cus_name = cus_name;
  }
  if (branch) {
    data.branch = branch;
  }
  if (ifsc_code) {
    data.ifsc_code = ifsc_code;
  }
  if (passbook_img) {
    data.passbook_img = passbook_img;
  }
  if (stattus) {
    data.stattus = stattus;
  }
  if (req.files) {
    if (req.files.vendoor_img) {
      alluploads = [];
      for (let i = 0; i < req.files.vendoor_img.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.vendoor_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.vendoor_img[i].path);
        alluploads.push(resp.secure_url);
      }
      data.vendoor_img = alluploads;
    }

    if (req.files.adhar_img_front) {
      alluploads = [];
      for (let i = 0; i < req.files.adhar_img_front.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.adhar_img_front[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adhar_img_front[i].path);
        alluploads.push(result.secure_url);
      }
      data.adhar_img_front = alluploads;
    }

    if (req.files.adhar_img_back) {
      alluploads = [];
      for (let i = 0; i < req.files.adhar_img_back.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.adhar_img_back[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adhar_img_back[i].path);
        alluploads.push(result.secure_url);
      }
      data.adhar_img_back = alluploads;
    }
    if (req.files.pancard_img_front) {
      alluploads = [];
      for (let i = 0; i < req.files.pancard_img_front.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.pancard_img_front[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.pancard_img_front[i].path);
        alluploads.push(result.secure_url);
      }
      data.pancard_img_front = alluploads;
    }
    if (req.files.pancard_img_back) {
      alluploads = [];
      for (let i = 0; i < req.files.pancard_img_back.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.pancard_img_back[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.pancard_img_back[i].path);
        alluploads.push(result.secure_url);
      }
      data.pancard_img_back = alluploads;
    }
    if (req.files.passbook_img) {
      alluploads = [];
      for (let i = 0; i < req.files.passbook_img.length; i++) {
        const result = await cloudinary.uploader.upload(
          req.files.passbook_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.passbook_img[i].path);
        alluploads.push(result.secure_url);
      }
      data.passbook_img = alluploads;
    }
  }
  if (data) {
    const findupdatedata = await appvender.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    if (findupdatedata) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findupdatedata,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        data: "error",
      });
    }
  }
};
