const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fournisseur = require("../model/Fournisseur");

// Login
router.post("/login", async (req, res) => {
  const role = req.body.role;
  console.log(role);
  //checking if email already exists

  let user;
  if (role !== "Fournisseur") {
    user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email n'existe pas" });
  } else {
    user = await Fournisseur.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email fournisseur n'existe pas" });
  }
  //chekin password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ message: "Mot de passe invalide" });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("accessToken", token).send({ user: user, accessToken: token });
});

// Forgot password
router.put("/forgot/password", (req, res) => {});

module.exports = router;
