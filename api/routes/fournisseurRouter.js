const router = require("express").Router();
const Fournisseur = require("../model/Fournisseur");
const Reclamation = require("../model/Reclamation");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail");

// Add frournisseur
router.post("/add", async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const fournisseur = new Fournisseur({
    organization: req.body.organization,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    sexe: req.body.sexe,
    password: hashedPassword,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    categorie: req.body.categorie,
    active: true,
  });
  try {
    await fournisseur.save();
    sendMail(
      req.body.email,
      `<p> Pour Authentifier a Baladiti </p> <br> <p> Login : ${req.body.email}</p><br> <p> Votre mot de passe : ${req.body.password} </p>`
    );
    res.send({
      fournisseur: fournisseur,
      message: "Le fournisseur a été ajouté avec succès.",
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// List fournisseur
router.get("/list", async (req, res) => {
  try {
    const fournisseur = await Fournisseur.find({});
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await Fournisseur.findById(req.params.id);
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update fournisseur Password
router.put("/passwordUpdate/:id", async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.params.id);
  if (!fournisseur) return res.send({ message: "fournisseur n'existe pas" });

  try {
    const id = req.params.id;
    const options = { new: true };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.params.newPassword, salt);
    const fournisseur = await Fournisseur.findByIdAndUpdate(
      id,
      {
        $set: { password: hashedPassword },
      },
      options
    );
    res.json(fournisseur);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete fournisseur
router.delete("/delete/:id", async (req, res) => {
  try {
    await Reclamation.remove({ _id: req.params.id });
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update active fournisseur
router.put("/active/:id", async (req, res) => {
  const fournisseur = await Fournisseur.findById(req.params.id);
  if (!fournisseur) return res.send({ message: "fournisseur n'existe pas" });

  try {
    const id = req.params.id;
    const newState = req.body.state;
    const options = { new: true };
    const activeFrounisseur = await Fournisseur.findByIdAndUpdate(
      id,
      {
        $set: { active: newState },
      },
      options
    );
    res.json({ message: "fournisseur a ete modifier", activeFrounisseur });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
