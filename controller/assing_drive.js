const Adriver = require('../models/assing_drive');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const bcrypt = require("bcrypt");

const resp = require("../helpers/apiResponse");


require("dotenv").config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


 

exports.add_drive = async (req, res) => {
    const {
        firstname,
        lastname,
        identity_type,
      //  identity_no,
        phone_no,
        address,
         email,
         password,
         cnfrmPassword,
        
    } = req.body;

  



    const newAdriver = Adriver({
        firstname: firstname,
        lastname: lastname,
        identity_type: identity_type,
      //  identity_no: identity_no,
        phone_no: phone_no,
        address: address,
        email:email,
        password:password,
        cnfrmPassword:cnfrmPassword,
    })

    const findexist = await Adriver.findOne({$or:[ {phone_no: phone_no},{email:email} ]});
    if (findexist) {
      resp.alreadyr(res);
    }else{

if (req.files) {
    if (req.files.adhar_card_img[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.adhar_card_img.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.adhar_card_img[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.adhar_card_img[i].path);
        alluploads.push(resp.secure_url);
      }
      newAdriver.adhar_card_img = alluploads;
    }

     

    if (req.files.regis_cardImg[0].path) {
      //console.log(req.files.gstImg);
      gstImg_arry = [];
      // console.log(req.files.gstImg.length);
      for (let i = 0; i < req.files.regis_cardImg.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.regis_cardImg[i].path,  
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        // console.log(resp);
        fs.unlinkSync(req.files.regis_cardImg[i].path);
        gstImg_arry.push(resp.secure_url);
      }
      newAdriver.regis_cardImg = gstImg_arry;
      //console.log(newStore);
    }
    if (req.files.insuranceImg[0].path) {
      //console.log(req.files.storepan_img);
      storeArry = [];
      //console.log(req.files.storepan_img.length);
      for (let i = 0; i < req.files.insuranceImg.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.insuranceImg[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.insuranceImg[i].path);
        storeArry.push(resp.secure_url);
      }
      newAdriver.insuranceImg = storeArry;
      //console.log(newStore);
    }
    if (req.files.licenseImg[0].path) {
      // console.log(req.files.tradelicence_img);
      licenceArry = [];
      //console.log(req.files.tradelicence_img.length);
      for (let i = 0; i < req.files.licenseImg.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.licenseImg[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.licenseImg[i].path);
        licenceArry.push(resp.secure_url);
      }
      newAdriver.licenseImg = licenceArry;
      //console.log(newStore);
    }
 
if (req.files.driver_img[0].path) {
  //console.log(req.files.storepan_img);
  dArry = [];
  //console.log(req.files.storepan_img.length);
  for (let i = 0; i < req.files.driver_img.length; i++) {
    //console.log(i);
    // const resp = await cloudinary.uploader.upload(
    //   req.files.shoplogo_img[i].path
    // );
    const resp = await cloudinary.uploader.upload(
      req.files.driver_img[i].path,
      { use_filename: true, unique_filename: false },
      function (cb) {
        // console.log(cb);
      }
    );
    //console.log(resp);
    fs.unlinkSync(req.files.driver_img[i].path);
    dArry.push(resp.secure_url);
  }
  newAdriver.driver_img = dArry;
  //console.log(newStore);
}

if (req.files.identity_img[0].path) {
  
  ideArry = [];
  
  for (let i = 0; i < req.files.identity_img.length; i++) {
    
    const resp = await cloudinary.uploader.upload(
      req.files.identity_img[i].path,
      { use_filename: true, unique_filename: false },
      function (cb) {
        
      }
    );
    
    fs.unlinkSync(req.files.identity_img[i].path);
    ideArry.push(resp.secure_url);
  }
  newAdriver.identity_img = ideArry;
   
}
    newAdriver
      .save()
      .then((result) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: result,
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
    }
}

exports.getall_drive = async (req, res) => {
    const finddata = await Adriver.find().sort({ sortorder: 1 })
    .populate("orderdata")
    if (finddata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: finddata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.viewone_drive = async (req, res) => {
    const findonedata = await Adriver.findOne({ _id: req.params.id });
    if (findonedata) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findonedata,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: error,
        })
    }
}

exports.del_drive = async (req, res) => {
    const deleteone = await Adriver.deleteOne({ _id: req.params.id });
    if (deleteone) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: deleteone,
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
        })
    }
}

exports.edit_drive = async (req, res) => {
    const {
        firstname,
        lastname,
        identity_type,
       // identity_no,
        phone_no,
        address,
        deliveryman_img,
        identity_img
    } = req.body;

    data = {};
    if (firstname) {
        data.firstname = firstname;
    }
    if (lastname) {
        data.lastname = lastname;
    }
    if (identity_type) {
        data.identity_type = identity_type;
    }
    // if (identity_no) {
    //     data.identity_no = identity_no;
    // }
    if (phone_no) {
        data.phone_no = phone_no;
    }
    if (address) {
        data.address = address;
    }
    if (deliveryman_img) {
        data.deliveryman_img = deliveryman_img;
    }
    if (identity_img) {
        data.identity_img = identity_img;
    }

    // multipal image update

    if (req.files) {
        if (req.files.deliveryman_img) {
            alluploads = [];
            for (let i = 0; i < req.files.deliveryman_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.deliveryman_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.deliveryman_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.deliveryman_img = alluploads;
        }

        if (req.files.identity_img) {
            alluploads = [];
            for (let i = 0; i < req.files.identity_img.length; i++) {
                const result = await cloudinary.uploader.upload(
                    req.files.identity_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.identity_img[i].path);
                alluploads.push(result.secure_url);
            }
            data.identity_img = alluploads;
        }
    }
    if (data) {
        const updatedata = await Adriver.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true }
        )
        if (updatedata) {
            res.status(200).json({
                status: true,
                msg: "success",
                data: updatedata,
            })
        } else {
            res.status(400).json({
                status: false,
                msg: "error",
                error: "error",
            })
        }
    }
}

exports.account_information = async (req, res) => {
    const {
        email,
        password,
        cnfrmPassword,
        status,
    } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashpassword = bcrypt.hashSync(password, salt);
    if (password == cnfrmPassword) {
        const findonedata = await Adriver.findOneAndUpdate(
            {_id: req.params.id},
            { $set: req.body, status: "true", email: email,  password: hashpassword, cnfrmPassword: hashpassword },
            {new: true},
        )
        if (findonedata) {
            res.status(200).json({
              status: true,
              msg: "success",
              data: findonedata,
            })
          } else {
            res.status(400).json({
              status: false,
              msg: "error",
              error: "error",
            })
          }
    } else {
        res.status(403).json({
            status: false,
            msg: "password is not match",
        })
    }
};


exports.login_driver = async (req, res) => {
    const { email, password } = req.body;
    const user = await Adriver.findOne({
      $or: [{ email: email }, {password: password }],
    });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );
        res.header("auth-token", token).status(200).send({
          status: true,
          token: token,
          msg: "success",
          user: user,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "User Doesnot Exists",
        error: "error",
      });
    }
  }


  