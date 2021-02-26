const Products = require("../models/product");

exports.getProducts = async (req, res, next) => {
  console.log("PRODUCT==", Products);
  try {
    const allProducts = await Products.find();
    res.status(200).json({
      sucess: true,
      data: allProducts,
    });
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: e._message,
    });
    console.log("Error ==>", e);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const createProduct = await Products.create(req.body);
    res.status(201).json({
      sucess: true,
      data: createProduct,
    });
    console.log("Chal gaya");
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: e._message,
    });
    console.log("Error ==>", e);
  }
};

exports.deleteSingleProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      res.status(404).json({
        sucess: false,
        error: "INVALID ID",
      });
    }
    res.status(200).json({
      sucess: true,
      message: `${req.params.id} is succesfully deleted`,
      data: {},
    });
  } catch (err) {
    console.log("DELETE ERROR", err.message);
    res.status(404).json({
      sucess: false,
      error: err.message,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  console.log("SINGLE ID", req.params.id);
  try {
    const singleProduct = await Products.findOne({ _id: req.params.id });
    // .populate("address")
    // .exec(function (err, res) {
    //   if (err) throw err;
    //   console.log("KI", res);
    // });
    if (!singleProduct) {
      // return next(new ErrorResponse(`${req.params.id} is not valid`, 400));
      res.status(404).json({
        sucess: false,
        error: "INVALI PRODUCT ID",
      });
    }
    res.status(200).json({
      sucess: true,
      data: singleProduct,
    });
  } catch (e) {
    res.status(404).json({
      sucess: false,
      error: err.message,
    });
  }
};
