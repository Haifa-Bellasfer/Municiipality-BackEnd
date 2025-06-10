const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authenticateToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const Citoyen = require("../model/Citoyen");

// Registration: add new user
router.post("/signUp", async (req, res) => {
  //checking if user already exists
  const emailExist = await Citoyen.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("L'email du citoyen already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new Citoyen({
    username: req.body.username,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    role: req.body.role,
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

// List all citoyens
router.get("/list", async (req, res) => {
  try {
    const users = await Citoyen.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get citoyen
router.get("/:id", async (req, res) => {
  try {
    const users = await Citoyen.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
