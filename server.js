const express = require("express");
require("dotenv").config();
const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
const connectDB = require("./config/db");
console.log("db", connectDB);
connectDB();

const app = express();
// var router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/product", product);
app.use("/order", order);
app.use("/user", user);

app.use((req, res) => {
  res.status(404).send({ message: "404 No Matched Route Found Bro!" });
});

const port = process.env.PORT || 8003;

app.listen(port);
console.log(`Server Running At Port ${port}`);
