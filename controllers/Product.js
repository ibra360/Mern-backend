const Products = require("../models/product");
const Users = require("../models/user");

exports.getProd = async (req, res) => {
  try {
    const allProducts = await Products.find().populate("user");
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

exports.updateProduct = async (req, res, next) => {
  // try {
  console.log("updateeeeeeeeeee", req.params);
  const id = req.params.id;
  let updateProduct;
  try {
    updateProduct = await Products.findById(id);
    if (!id) {
      res.status(400).json({
        sucess: false,
        data: "Invalid Id",
      });
    }

    console.log("updateeeeeeeeeee 2222222222", updateProduct);
    console.log("uiiiiii", updateProduct.toString() !== req.user.id);
  } catch (error) {
    console.log("err", error.message);
  }

  if (!updateProduct) {
    console.log("err");
  }

  console.log("UP PRD", updateProduct);

  if (!updateProduct) {
    res.status(400).json({
      sucess: false,
      data: "Invalid Id",
    });
  }
  //Make sure the right owner is updating it's product
  // console.log("users id", updateProduct, req.user.id);
  if (updateProduct.user.toString() !== req.user.id) {
    res.status(401).json({
      sucess: false,
      data: "You are not authorize to update this product",
    });
  }
  console.log("2 cheezen", req.params.id, req.body);

  updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    sucess: true,
    data: updateProduct,
  });
};

exports.createProduct = async (req, res, next) => {
  console.log("RQ BODY", req.body);
  const { title, description, data } = req.body;
  let user;
  try {
    user = await Users.findById(data);
  } catch (e) {
    return res.status(401).json({
      sucess: false,
      data: "yar soryy",
    });
  }
  if (!user) {
    return res.status(401).json({
      sucess: false,
      data: "Invalid ID",
    });
  }

  const newProd = new Products({
    title,
    description,
    user: data,
  });
  try {
    const createProduct = await newProd.save();
    user.products.push(createProduct.id);
    await user.save();

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

exports.deleteSingleProduct = async (req, res) => {
  try {
    console.log("iiiiiii", req.params);

    const deleteProduct = await Products.findById(req.params.id).populate(
      "user"
    );
    console.log("dlt pd", deleteProduct);
    console.log("iddddddd", req.user);

    if (!deleteProduct) {
     return res.status(404).json({
        sucess: false,
        error: "INVALID ID",
      });
    }

    if (deleteProduct.user.id !== req.user.id) {
      res.status(401).json({
        sucess: false,
        data: "You are not authorize to update this product",
      });
    }
    console.log("dlt pd", deleteProduct);
    deleteProduct.user.products.pull(deleteProduct.id);
    await deleteProduct.remove();
    await deleteProduct.user.save();

    res.status(200).json({
      sucess: true,
      message: `${req.params.id} is succesfully deleted`,
      data: deleteProduct,
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
