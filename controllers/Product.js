const Products = require("../models/product");
const Users = require("../models/user");

exports.getProd = () => {
  // passport.authenticate("jwt-user", { session: false });
  getProducts();
  const getProducts = async (req, res, next) => {
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
};

exports.updateProduct = async (req, res, next) => {
  // try {
  let updateProduct = await Products.findById(req.params.id);

  if (!updateProduct) {
    res.status(400).json({
      sucess: false,
      data: "Invalid Id",
    });
  }
  //Make sure the right owner is updating it's product
  console.log("users id", updateProduct, req.user.id);

  if (updateProduct.user.toString() !== req.user.id) {
    if (!updateProduct) {
      res.status(401).json({
        sucess: false,
        data: "You are not authorize to update this product",
      });
    }
    updateProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      sucess: true,
      data: updateProduct,
    });
  }
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
