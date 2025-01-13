const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fournisseur = require("../model/Fournisseur");
const Citoyen = require("../model/Citoyen");
const Responsable = require("../model/Responsable");

// Login
router.post("/login", async (req, res) => {
  const role = req.body.role;

  let user;
  if (role === "Fournisseur") {
    user = await Fournisseur.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email n'existe pas" });
  }

  if (role === "Citoyen") {
    user = await Citoyen.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email n'existe pas" });
  }

  if (role === "Responsable") {
    user = await Responsable.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email fournisseur n'existe pas" });
  }

  //chekin password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ message: "Mot de passe invalide" });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("accessToken", token).send({ user: user, accessToken: token });
});

module.exports = router;
