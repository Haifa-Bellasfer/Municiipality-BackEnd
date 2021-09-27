const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//Import Routes
const authRoute = require("./routes/auth");
const reclamRoute = require("./routes/reclamation");

/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin : *"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});*/
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  }),
);

dotenv.config();

const { DB_CONNECT } = process.env;

//connect to DB
mongoose.connect(
  DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database"),
);

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middleware
app.use("/api/user", authRoute);
app.use("/api/reclam", reclamRoute);

app.listen(3000, () => console.log(" server running at 3000"));
