const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//Import Routes
const authRoute = require("./routes/authRouter");
const reclamationRoute = require("./routes/reclamationRouter");
const muncipalityRoute = require("./routes/municipalityRouter");
const fournisseurRouter = require("./routes/fournisseurRouter");
const citoyenRouter = require("./routes/citoyenRouter");
const responsableRouter = require("./routes/responsableRouter");

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();

const { DB_CONNECT, PORT } = process.env;

//connect to DB
mongoose.connect(
  DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to database ✔")
);

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middleware
app.use("/api/auth", authRoute);
app.use("/api/reclamation", reclamationRoute);
app.use("/api/municipality", muncipalityRoute);
app.use("/api/fournisseur", fournisseurRouter);
app.use("/api/citoyen", citoyenRouter);
app.use("/api/responsable", responsableRouter);

app.listen(PORT, () => console.log("Baladiti is running on ✔"));
