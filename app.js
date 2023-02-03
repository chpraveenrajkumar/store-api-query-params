require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRoute = require("./router/products");

app.use("/api/v1/products", productsRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on the port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
