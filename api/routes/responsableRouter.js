const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authenticateToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");
const Responsable = require("../model/Responsable");
const Municipality = require("../model/Municipality");

// Registration: add new responsable
router.post("/signUp", async (req, res) => {
  //checking if user already exists
  const emailExist = await Responsable.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("L'email du citoyen already exists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Validate municipality
  const municipalityDoc = await Municipality.findById(municipality);
  if (!municipalityDoc) {
    return res.status(400).send({ message: "Municipality not found" });
  }

  const user = new Responsable({
    matricule: req.body.matricule,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: hashedPassword,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    sexe: req.body.sexe,
    municipality: municipalityDoc,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header("accessToken", token).send({ user: user, accessToken: token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      matricule,
      nom,
      prenom,
      email,
      sexe,
      password,
      adresse,
      telephone,
      municipality,
    } = req.body;

    console.log(
      matricule,
      nom,
      prenom,
      email,
      sexe,
      password,
      adresse,
      telephone,
      municipality
    );
    // Validate required fields
    if (
      !matricule ||
      !nom ||
      !prenom ||
      !email ||
      !sexe ||
      !password ||
      !adresse ||
      !telephone ||
      !municipality
    ) {
      return res.status(400).send({ message: "Invalid input data" });
    }

    // Check if email already exists
    const emailExist = await Responsable.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .send({ message: "L'email du responsable already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate municipality
    const municipalityDoc = await Municipality.findById(municipality);
    if (!municipalityDoc) {
      return res.status(400).send({ message: "Municipality not found" });
    }

    // Create responsable
    const responsable = new Responsable({
      matricule,
      nom,
      prenom,
      email,
      sexe,
      password: hashedPassword,
      adresse,
      telephone,
      municipality: municipalityDoc,
    });

    // Save to DB
    await responsable.save();

    res.send({
      responsable,
      message: "Le responsable a été ajouté avec succès.",
    });
  } catch (err) {
    console.error("Error in /add:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
});

// List all responsables
router.get("/list", async (req, res) => {
  try {
    const users = await Responsable.find().populate("municipality");
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

// Delete responsable by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Responsable.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ message: "Responsable not found" });
    }
    res.send({ message: "Responsable supprimé avec succès." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Erreur lors de la suppression", error: err });
  }
});

module.exports = router;
