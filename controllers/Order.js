const Orders = require("../models/order");
const User = require("../models/user");

exports.getOrder = async (req, res) => {
  try {
    const allOrders = await Orders.find();
    res.status(200).json({
      sucess: true,
      data: allOrders,
    });
  } catch (e) {
    res.status(401).json({
      sucess: false,
      data: e._message,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    console.log("CREATE ORDER 011", req.body);

    const user = await User.findOne({ _id: req.user.id });
    req.body.user = user._id;
    console.log("user._id", user);
    console.log("req.body.user", req.body.user);
    // const createOrders = new Orders(req.body);
    const { photo, name, cost, description, data } = req.body;

    // req.body ki jagah {... }
    const createOrders = new Orders({
      photo,
      name,
      cost,
      description,
      user: data,
    });

    const savedOrder = await createOrders.save();
    user.orders.push(savedOrder.id);
    await user.save();

    let chec = await Orders.populate(savedOrder, "user");
    console.log("populated -->", savedOrder);
    // console.log("chec -->", chec);

    res.status(201).json({
      sucess: true,
      data: savedOrder,
    });
  } catch (e) {
    res.status(201).json({
      sucess: false,
      data: "ERROR AAGAYA BHAI",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Orders.findByIdAndDelete(req.params.id);
    if (!deleteOrder) {
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