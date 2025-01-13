const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authenticateToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const Responsable = require("../model/Responsable");

// Registration: add new responsable
router.post("/signUp", async (req, res) => {
  //checking if user already exists
  const emailExist = await Responsable.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("L'email du citoyen already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Responsable({
    matricule: req.body.matricule,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: hashedPassword,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    sexe: req.body.sexe,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header("accessToken", token).send({ user: user, accessToken: token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// List all responsables
router.get("/list", async (req, res) => {
  try {
    const users = await Responsable.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get responsable
router.get("/:id", async (req, res) => {
  try {
    const users = await Responsable.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
