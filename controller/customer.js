const customer = require("../models/customers");

exports.addCustomer = async (req, res) => {
  const { name, mobile, email, status } = req.body;

  const customerdata = await customer({
    name: name,
    mobile: mobile,
    email: email,
    status: status,
  });

  const findexist = await customer.findOne({ email: email });
  if (findexist) {
    res.status(403).json({
      status: false,
      msg: "Allready exist",
      data: {},
    });
  } else {
    customerdata
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

exports.customersList = async (req, res) => {
  const findexist = await customer.find();

  if (findexist) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findexist,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.view_one_customer = async (req, res) => {
  const findsingle = await customer.findOne({ _id: req.params.id });

  if (findsingle) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findsingle,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.delete_customer = async (req, res) => {
  const deleteone = await customer.deleteOne({ _id: req.params.id });
  if (deleteone) {
    res.status(200).json({
      status: true,
      msg: "success delete",
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

exports.edit_customer = async (req, res) => {
  const updatedata = await customer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  if (updatedata) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: updatedata,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
